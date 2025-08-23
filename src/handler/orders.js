export const userRoutes = new Elysia()
    .get('/users', getUsers.handler)