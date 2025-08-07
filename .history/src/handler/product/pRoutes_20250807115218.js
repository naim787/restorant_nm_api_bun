import { Elysia } from 'elysia';
import { getAllProducts, createProduct } from './pHandler.js';

export const productRoutes = new Elysia()
    .post('/create-products', createProduct.handler, {
        body: createProduct.body
    })
    .get('/products', getAllProducts.handler);