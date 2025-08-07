import { Elysia } from 'elysia';
import { createProduct } from '../handlers/pro';

export const productRoutes = new Elysia()
    .post('/create-products', createProduct);