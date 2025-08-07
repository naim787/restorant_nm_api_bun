import { Elysia } from 'elysia';
import { createProduct } from './pHandler.js';
import { getAllProducts } from './getAllProducts.js';

export const productRoutes = new Elysia()
    .post('/create-products', createProduct.handler, {
        body: createProduct.body
    })
    .get('/products', getAllProducts.handler);