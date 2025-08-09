import { Elysia } from 'elysia';
import { getUsers } from './user/uGet.js';
import { getUsers, createUser } from './user/uHandler.js';

export const userRoutes = new Elysia()
    .get('/users', getUsers)
    .post('/create-users', createUser);