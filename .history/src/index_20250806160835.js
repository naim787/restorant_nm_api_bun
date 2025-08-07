import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import { setupDatabase } from './config/database.js';
import { userRoutes } from './routes/userRoutes.js';
import { productRoutes } from './routes/productRoutes.js';
import { websocketHandler } from './handlers/websocketHandler.js';

// Setup database
await setupDatabase();

const app = new Elysia()
    .use(cors({
        origin: true, // Allow all origins (equivalent to "*")
    }))

// User routes
.use(userRoutes)

// Product routes  
.use(productRoutes)

// WebSocket route
.ws('/ws/orders', websocketHandler)

.listen(3000, () => {
    console.log('🦊 Server is running on http://localhost:3000');
});

export default app;