import { prisma } from '../../conf/database.js';

export const websocketHandler = {
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

            // Pastikan orders adalah array
            if (!Array.isArray(orders)) {
                console.error('❌ Orders bukan array');
                return;
            }

            // Simpan ke database
            // simpan ke DB
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


            console.log(`✅ ${result.count} pesanan disimpan ke database`);

            // Kirim respon ke FE
            ws.send(JSON.stringify({ success: true, saved: result.count }));

        } catch (error) {
            console.error('❌ Error processing orders:', error);
            ws.send(JSON.stringify({ success: false, error: error.message }));
        }
    },

    open: (ws) => {
        console.log('WebSocket connection opened');
    },

    close: (ws) => {
        console.log('WebSocket connection closed');
    },

    error: (ws, error) => {
        console.error('WebSocket error:', error);
    }
};