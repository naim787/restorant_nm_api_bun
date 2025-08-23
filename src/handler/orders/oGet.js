import { prisma } from '../../conf/database.js';

export const orders = {
    handle: async({set }) => {
        try {
            const order = await prisma.rder.findMany();

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