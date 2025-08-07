import { Elysia } from 'elysia';
import { createProduct } from './pcHandler.js';

export const productRoutes = new Elysia()
    .post('/create-products', createProduct.handler, {
        body: createProduct.body
    });