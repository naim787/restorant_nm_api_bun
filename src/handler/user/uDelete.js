import { prisma } from '../../conf/database.js';
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