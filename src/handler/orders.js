import Elysia from 'elysia';
import { getUsers } from './orders/oGet.js';

export const userRoutes = new Elysia()
    .get('/users', getUsers.handler)