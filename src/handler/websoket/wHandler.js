import { prisma } from '../../conf/database.js';

const clients = new Set();

export const websocketHandler = {
    open: (ws) => {
        console.log('WebSocket connection opened');
        clients.add(ws); // tambahkan ke daftar client
    },

    close: (ws) => {
        console.log('WebSocket connection closed');
        clients.delete(ws); // hapus dari daftar client
    },

    error: (ws, error) => {
        console.error('WebSocket error:', error);
        clients.delete(ws);
    },

    message: async(ws, message) => {
        try {
            console.log('📩 Raw message:', message, typeof message);

            let orders;
            if (typeof message === 'string') {
                orders = JSON.parse(message);
            } else if (message instanceof Uint8Array) {
                orders = JSON.parse(new TextDecoder().decode(message));
            } else {
                orders = message;
            }

            console.log('✅ Parsed orders:', orders);

            // Pastikan orders.product_orders adalah array
            if (!orders.product_orders || !Array.isArray(orders.product_orders)) {
                console.error('❌ orders.product_orders bukan array');
                return;
            }

            // Simpan ke database
            const savedOrder = await prisma.order.create({
                data: {
                    table_id: orders.table_id,
                    waiter_name: orders.waiter_name,
                    time: orders.time,
                    total: orders.total,
                    status: "pending",
                    product_orders: {
                        create: orders.product_orders.map(p => ({
                            products_id: p.products_id,
                            products_name: p.products_name,
                            product_price: parseInt(p.product_price),
                            value: p.value,
                            total: p.total,
                            status: p.status
                        }))
                    }
                },
                include: { product_orders: true }
            });

            console.log("✅ Pesanan tersimpan:", savedOrder);

            const payload = JSON.stringify({ success: true, saved: savedOrder });
            for (const client of clients) {
                if (client.readyState === 1) { // 1 = OPEN
                    client.send(payload);
                }
            }

        } catch (error) {
            console.error('❌ Error processing orders:', error);
            ws.send(JSON.stringify({ success: false, error: error.message }));
        }
    }
};