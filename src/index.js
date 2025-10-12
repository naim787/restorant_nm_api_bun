import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import { staticPlugin } from '@elysiajs/static'
import { setupDatabase } from './conf/database.js';
import { userRoutes } from './handler/uRoutes.js';
import { productRoutes } from './handler/pRoutes.js';
import { ordersRoutes } from './handler/orders.js'
import { websocketHandler } from './handler/websoket/wHandler.js';
import { DesDat } from './services/encripsi_descripsi.js';
import { t } from 'elysia';

// Setup database
await setupDatabase();

const app = new Elysia()
    .use(cors())
    .use(staticPlugin())
    .get('/', () => 'Hello Elysia')

    // pasword restorant
    .post('/passwordResto', async ({ body, req , set}) => {

        const password = body.password;
        console.log(password)
        try {
          DesDat("f545d873d98301bd2f33952d3aff3a8e10bb4b9afacfc3620ef8cf534483119f", password);
          // Set cookie bernama "naim" dengan value "true" (bisa disesuaikan)
          set.cookie("cokkieRESTO", "NAIM123", {
              httpOnly: true,
              path: "/",
              maxAge: 60 * 60 * 24, // 1 hari
              sameSite: "Strict"
          });
          return { message: 'valid' };
        } catch (error) {
          return { message: 'X invalid' };
        }
    },{ body: t.Object({  password: t.String() }) })

    // User routes
    .use(userRoutes)
    // Product routes  
    .use(productRoutes)
    // orders routes
    .use(ordersRoutes)
    // WebSocket route
    .ws('/ws/orders', websocketHandler)
    .listen({
        port: 3001,
        hostname: '0.0.0.0'
    });
    
export default app;