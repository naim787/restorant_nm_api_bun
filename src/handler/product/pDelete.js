import { prisma } from '../../conf/database.js';
import { t } from 'elysia';
import { unlinkSync, existsSync } from 'fs';
import { join } from 'path';

export const deleteProduct = {
    handler: async({ params, set }) => {
        try {
            const deleted = await prisma.products.delete({
                where: {
                    id: params.id
                }
            });

            // hapus img 
            const imagePath = join('public', product.image_url);

            // 4. Hapus file jika ada
            if (existsSync(imagePath)) {
                unlinkSync(imagePath);
                console.log("🧹 Gambar dihapus:", imagePath);
            } else {
                console.warn("⚠️ File gambar tidak ditemukan:", imagePath);
            }

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