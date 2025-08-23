import Elysia from 'elysia';
import { getUsers } from './order';

export const userRoutes = new Elysia()
    .get('/users', getUsers.handler)