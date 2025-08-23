import Elysia from 'elysia';
import { orders } from './orders/oGet.js';

export const ordersRoutes = new Elysia()
    .get('/orders', orders.handler)