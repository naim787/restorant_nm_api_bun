import { Elysia } from 'elysia';
import { createProduct } from '../handlers/';

export const productRoutes = new Elysia()
    .post('/create-products', createProduct);