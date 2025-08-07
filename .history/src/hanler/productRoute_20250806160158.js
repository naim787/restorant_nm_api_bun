import { Elysia } from 'elysia';
import { createProduct } from '../handlers/product';

export const productRoutes = new Elysia()
    .post('/create-products', createProduct);