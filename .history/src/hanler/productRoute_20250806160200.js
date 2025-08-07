import { Elysia } from 'elysia';
import { createProduct } from '../handlers/productH';

export const productRoutes = new Elysia()
    .post('/create-products', createProduct);