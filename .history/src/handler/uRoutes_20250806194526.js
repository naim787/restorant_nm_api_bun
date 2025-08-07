import { Elysia } from 'elysia';
import { getUsers, createUser } from './uHandler.js';

export const userRoutes = new Elysia()
    .get('/users', getUsers)
    .post('/create-users', createUser);