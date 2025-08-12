import { prisma } from '../../conf/database.js';

export const websocketHandler = {
    message: async(ws, message) => {
        try {
            const orders = JSON.parse(message);

            if (!Array.isArray(orders)) {
                throw new Error('Expected an array of orders');
            }

            for (const order of orders) {
                // Convert products to JSON string if it's an object
                const orderData = {
                    ...order,
                    products: typeof order.products === 'object' ?
                        JSON.stringify(order.products) : order.products
                };

                await prisma.pesnan.create({
                    data: orderData
                });
            }

            console.log(orders)
            const response = {
                message: "Orders saved successfully"
            };

            ws.send(JSON.stringify(response));
        } catch (error) {
            console.error('Error processing orders:', error);

            const errorResponse = {
                error: "Failed to save orders",
                details: error.message
            };

            ws.send(JSON.stringify(errorResponse));
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