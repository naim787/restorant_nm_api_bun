import { prisma } from '../../conf/database.js';
// get product

function bigIntToString(obj) {
    return JSON.parse(JSON.stringify(obj, (_, value) =>
        typeof value === 'bigint' ? value.toString() : value
    ));
}

export const getAllProducts = {
    handler: async({set }) => {
        try {
            const products = await prisma.products.findMany();
            return {
                message: "Daftar semua produk",
                data: products
            };
        } catch (error) {
            console.error("❌ Gagal ambil produk:", error.message);
            set.status = 500;
            return {
                error: "Gagal mengambil data produk"
            };
        }
    }
};