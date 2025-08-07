import { Elysia } from 'elysia';
import { createProduct } from './product/pHandler.js';
import { getAllProducts, createProduct } from './product/pHandler.js';

export const productRoutes = new Elysia()
    .post('/create-products', createProduct.handler, {
        body: createProduct.body
    })
    .get('/products', getAllProducts.handler);