import { Elysia } from 'elysia';
import { getUsers, createUser } from '$src//handler/userHandlers.js';

export const userRoutes = new Elysia()
    .get('/users', getUsers)
    .post('/create-users', createUser);