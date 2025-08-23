import Elysia from 'elysia';
import { Orders } from './orders/oGet.js';

export const userRoutes = new Elysia()
    .get('/users', orders.handler)