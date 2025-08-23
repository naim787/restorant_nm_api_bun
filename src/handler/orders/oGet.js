import { prisma } from '../../conf/database.js';

export const orders = {
    handler: async({set }) => {
        try {
            const order = await prisma.order.findMany({
                include: {
                    product_orders: true
                }
            });


            return {
                message: "berhasil meggambil data order",
                data: order
            };

        } catch (error) {
            set.status = 500;
            return {
                error: "gagal meggambil data order"
            };
        }
    }
}