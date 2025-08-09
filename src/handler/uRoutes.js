import { Elysia } from 'elysia';
import { getUsers } from './user/uGet.js';
import { createUser } from './user/uCreate.js';

export const userRoutes = new Elysia()
    .get('/users', getUsers)
    .post('/create-users', createUser);