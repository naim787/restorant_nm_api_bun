import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import { staticPlugin } from '@elysiajs/static'
import { setupDatabase } from './conf/database.js';
import { userRoutes } from './handler/uRoutes.js';
import { productRoutes } from './handler/pRoutes.js';
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
    .use()
    .listen({
        port: 3001,
        hostname: '0.0.0.0'
    });


export default app;