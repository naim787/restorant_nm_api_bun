import { prisma } from '../../conf/database.js';
import { t } from 'elysia';
import { unlinkSync, existsSync } from 'fs';
import { join } from 'path';

export const deleteProduct = {
    handler: async({ params, set }) => {
        try {
            // 🔹 Ambil produk dulu untuk dapetin image_url
            const product = await prisma.products.findUnique({
                where: {
                    id: params.id
                }
            });

            if (!product) {
                set.status = 404;
                return {
                    error: "Produk tidak ditemukan"
                };
            }

            // meghapus tanda /public
            const urlImg = product.image_url.replace(/^public\//, '');
            // 🔸 Hapus gambar
            const imagePath = join('public', url); // misalnya 'public/uploads/123.jpg'

            if (existsSync(imagePath)) {
                unlinkSync(imagePath);
                console.log("🧹 Gambar dihapus:", imagePath);
            } else {
                console.warn("⚠️ File gambar tidak ditemukan:", imagePath);
            }

            // 🔸 Hapus produk dari DB
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
            set.status = 500;
            return {
                error: "Terjadi kesalahan saat menghapus produk"
            };
        }
    },

    params: t.Object({
        id: t.String()
    })
};