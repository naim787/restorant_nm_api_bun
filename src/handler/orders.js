import Elysia from 'elysia';
import { orders } from './orders/oGet.js';

export const userRoutes = new Elysia()
    .get('/users', orders.handler)