import { prisma } from '../../conf/database.js';

export const websocketHandler = {,

    open: (ws) => {
        console.log('WebSocket connection opened');
    },

    close: (ws) => {
        console.log('WebSocket connection closed');
    },

    error: (ws, error) => {
        console.error('WebSocket error:', error);
    }
};      console.log('✅ Parsed orders:', orders);
    } catch (error) {
        console.error('Error processing orders:', error);
    }
}
,

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