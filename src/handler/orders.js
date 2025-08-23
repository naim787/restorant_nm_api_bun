import Elysia from 'elysia';
import { getUsers } from './orders/';

export const userRoutes = new Elysia()
    .get('/users', getUsers.handler)