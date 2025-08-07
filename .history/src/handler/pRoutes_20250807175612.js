import { Elysia } from 'elysia';
import { createProduct } from './product/pCreate.js';
import { getAllProducts } from './product/pGet.js';

export const productRoutes = new Elysia()
    .post('/create-products', createProduct.handler, {
        body: createProduct.body
    })
    .get('/products', getAllProducts.handler);