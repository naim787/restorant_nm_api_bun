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
        } catch (error) {
            console.error('Error processing orders:', error);
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