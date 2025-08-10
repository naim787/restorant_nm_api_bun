import { prisma } from '../../conf/database.js';
import { generateUniqueID } from '../../services/id_generate.js';
export const createUser = {

}
async({ body, set }) => {
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
        set.status = 500;
        return {
            error: "Failed to create user"
        };
    }
};