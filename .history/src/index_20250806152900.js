import { Elysia } from 'elysia'
const app = new Elysia()
    .get('/', 'Hello World')
    .post(
        '/id/:id',
        ({ status, params: { id } }) => {
            return status(201, id)
        }
    )
    .get('/:id', ({ params }) => {
        return `Kamu mengakses ID: ${params.id}`;
    });
.listen({
    port: 3000,
    hostname: '0.0.0.0', // 👈 ini yang penting
})
console.log("Hello Elsiya😗")