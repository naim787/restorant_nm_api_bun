import { prisma } from '../../conf/database.js';
import { t } from 'elysia';

export const deleteProduct = {
    handler: async({ params, set }) => {
        try {
            const deleted = await prisma.products.delete({
                where: {
                    id: params.id
                }
            });

            return {
                message: "Produk berhasil dihapus",
                data: deleted
            };
        } catch (err) {
            console.error("❌ Gagal hapus produk:", err.message);
            set.status = 404;
            return {
                error: "Produk tidak ditemukan atau gagal dihapus"
            };
        }
    },

    params: t.Object({
        id: t.String()
    })
};