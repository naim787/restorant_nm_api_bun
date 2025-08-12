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
            const result = await prisma.pesnan.createMany({
                data: orders.map(order => ({
                    products_id: order.products_id,
                    table_id: String(order.table_id),
                    waiter_name: order.waiter_name,
                    time: order.time,
                    status: order.status
                })),
                skipDuplicates: true // optional, cegah duplikat kalau ada constraint unik
            });

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