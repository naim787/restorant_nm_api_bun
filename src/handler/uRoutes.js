import { Elysia } from 'elysia';
import { getUsers } from './user/uGet.js';
import { createUser } from './user/uCreate.js';
import { deleteUsers } from './user/uDelete.js';

export const userRoutes = new Elysia()
    .get('/users', getUsers.handler)
    .post('/create-users', createUser.handler, {
        body: createUser.body
    })
    .delete('/delete-user/:id', deleteUsers.handler, {
        body: t.Object({
            name: t.String(),
            email: t.String(),
            password: t.String(),
            bis_loc: t.String(),
            date_loc: t.String(),
            year: t.String()
        })
    });