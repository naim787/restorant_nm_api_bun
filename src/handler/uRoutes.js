import { Elysia } from 'elysia';
import { getUsers } from './user/uGet.js';
import { createUser } from './user/uCreate.js';
import { deleteUsers } from './user/uDelete.js';

export const userRoutes = new Elysia()
    .get('/users', getUsers)
    .post('/create-users', createUser)
    .delete('/delete-user/:id', deleteUsers.handler, {
        params: deleteUsers.params
    });