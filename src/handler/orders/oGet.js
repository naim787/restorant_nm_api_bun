import { prisma } from '../../conf/database.js';

export const Orders = {
    handle: async({set }) => {
        try {
            const order = await prisma.order.findMany();

            return {
                message: "Users retrieved successfully",
                data: order
            };
        } catch (error) {
            set.status = 500;
            return {
                error: "Failed to retrieve users"
            };
        }
    }
}