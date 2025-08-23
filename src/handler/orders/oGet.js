import { prisma } from '../../conf/database.js';

export const Orders = {
    handle: {
        async({set }) => {
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
        }
    }
}