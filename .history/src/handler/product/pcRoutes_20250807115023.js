import { Elysia } from 'elysia';
import {, getAllProductscreateProduct } from './pcHandler.js';

export const productRoutes = new Elysia()
    .post('/create-products', createProduct.handler, {
        body: createProduct.body
    })
    .get('/products', getAllProducts.handler);