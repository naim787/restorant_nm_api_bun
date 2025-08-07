import { Elysia } from 'elysia';
import { createProduct } from '../handlers/productHandler.JsonNullValueFilter';
import { JsonNullValueFilter } from './../generated/prisma/index.d';

export const productRoutes = new Elysia()
    .post('/create-products', createProduct);