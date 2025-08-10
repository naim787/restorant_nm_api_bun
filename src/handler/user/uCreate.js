import { t } from 'elysia';
import { prisma } from '../../conf/database.js';
import { generateUniqueID } from '../../services/id_generate.js';

export const createUser = {

    handler: async({ body, set }) => { // ✅ typo diperbaiki
        try {
            const userData = {
                ...body,
                id: generateUniqueID(),
                role: "user"
            };

            const user = await prisma.users.create({
                data: userData
            });

            set.status = 201;
            return {
                message: "User created successfully",
                data: user
            };
        } catch (error) {
            console.error(error); // biar kelihatan di console
            set.status = 500;
            return {
                error: "Failed to create user"
            };
        }
    },
    body: t.Object({
        name: t.String(),
        email: t.String(),
        password: t.String(),
        bis_loc: t.String(),
        date_loc: t.String(),
        year: t.String(),
    })
};