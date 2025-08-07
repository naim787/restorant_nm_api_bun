import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import { setupDatabase } from './conf/database.js';
import { userRoutes } from './handler/user/uRoutes.js';
import { productRoutes } from './handler/product/pRoutes.js';
import { websocketHandler } from './handler/websoket/wHandler.js';

// Setup database
await setupDatabase();

const app = new Elysia()
    .use(cors())
    .use(staticPlugin())
    .get('/', () => 'Hello Elysia')
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