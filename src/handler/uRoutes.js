import { Elysia } from 'elysia';
import { getUsers } from './user/uG.js';
import { getUsers, createUser } from './user/uHandler.js';

export const userRoutes = new Elysia()
    .get('/users', getUsers)
    .post('/create-users', createUser);