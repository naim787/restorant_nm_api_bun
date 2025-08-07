import { Elysia } from 'elysia';
import { createProduct } from '../handlers/productHandler.js';

export const productRoutes = new Elysia()
    .post('/create-products', createProduct);