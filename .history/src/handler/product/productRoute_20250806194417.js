import { Elysia } from 'elysia';
import { createProduct } from './pHandler.js';

export const productRoutes = new Elysia()
    .post('/create-products', createProduct);