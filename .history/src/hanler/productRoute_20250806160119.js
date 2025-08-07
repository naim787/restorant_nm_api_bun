import { Elysia } from 'elysia';
import { createProduct } from '../handlers/productHandlers.js';

export const productRoutes = new Elysia()
    .post('/create-products', createProduct);