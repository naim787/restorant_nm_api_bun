import { prisma } from '../conf/database.js';
import { generateUniqueID } from '../service/idGenerator.js';

export const getUsers = async({set }) => {
    try {
        const users = await prisma.users.findMany();

        return {
            message: "Users retrieved successfully",
            data: users
        };
    } catch (error) {
        set.status = 500;
        return {
            error: "Failed to retrieve users"
        };
    }
};

export const createUser = async({ body, set }) => {
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

export const deleteUsers = async({set }) => {
    try {
        await prisma.users.deleteMany();

        return {
            message: "All users deleted successfully"
        };
    } catch (error) {
        set.status = 500;
        return {
            error: "Failed to delete users"
        };
    }
};