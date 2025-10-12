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

// cokie
import { cookie } from '@elysiajs/cookie';


// Setup database
await setupDatabase();

const app = new Elysia()
    .use(cors())
    .use(cookie())
    .use(staticPlugin())
    .get('/', () => 'Hello Elysia')

      // pasword restorant
   .post('/passwordResto', ({ body, cookie: { cokkieRESTO } }) => {
        const password = body.password;
        console.log("Password diterima:", password);

        try {
            DesDat(
                "f545d873d98301bd2f33952d3aff3a8e10bb4b9afacfc3620ef8cf534483119f",
                password
            );

            cokkieRESTO.set({
                value: { status: 'OK' },
                httpOnly: false,
                maxAge: 60 * 60, // 1 jam, opsional
            });

            return { message: 'valid' };
        } catch (error) {
            console.error("ERROR SAAT VERIFIKASI:", error);
            return { message: 'X invalid' };
        }
    }, {
        body: t.Object({
            password: t.String()
        }),
        // cookie: t.Cookie({
        //     cokkieRESTO: t.Object({
        //         status: t.String()
        //     })
        // }, {
        //     secrets: 'NAIM_SECRET', // 🔐 ganti dengan secretmu sendiri
        //     sign: ['cokkieRESTO']
        // })
    })


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