import { Elysia } from 'elysia';
import { createProduct } from './product/p.js';
import { getAllProducts } from './product/pHandler.js';

export const productRoutes = new Elysia()
    .post('/create-products', createProduct.handler, {
        body: createProduct.body
    })
    .get('/products', getAllProducts.handler);