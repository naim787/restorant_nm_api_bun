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
    .use(cors({
        origin: 'http://localhost:5173', // Ganti dengan URL frontend kamu
	    credentials: true
    }))
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
            
            // Sudah login → tolak verifikasi ulang > (untuk sementara hash di taru di sini nanti akan di taru di env)
             if (cokkieRESTO.value === "f545d873d98301bd2f33952d3aff3a8e10bb4b9afacfc3620ef8cf534483119f") {
                // return;
                //  return { redirectTo: '/waiters' };
                return { message: 'valid' };
             } else {
                 cokkieRESTO.set({
                     value: 'f545d873d98301bd2f33952d3aff3a8e10bb4b9afacfc3620ef8cf534483119f',
                     httpOnly: true,
                     maxAge: 60 * 60,
                     sameSite: 'Lax',
                     path: '/'
                 });
                 return { message: 'valid' };
             }

        } catch (error) {
            console.error("ERROR SAAT VERIFIKASI:", error);
            return { message: 'X invalid' };
        }
    }, {
        body: t.Object({
            password: t.String()
        }),
        
        // validasi cookie
        //  cookie: t.Cookie({
        //     cokkieRESTO: t.String()
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