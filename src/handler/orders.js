import Elysia from 'elysia';
import { getUsers } from './user/uGet';

export const userRoutes = new Elysia()
    .get('/users', getUsers.handler)