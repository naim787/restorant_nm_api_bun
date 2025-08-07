import { Elysia } from 'elysia';
import { createProduct } from '../handlers/productHandler.JsonNullValueFilter';

export const productRoutes = new Elysia()
    .post('/create-products', createProduct);