import { prisma } from '../../conf/database.js';
import { t } from 'elysia';

export const deleteUsers() {
    handler: async({ params, set }) => {
        try {
            // 🔹 Cek apakah user ada
            const user = await prisma.users.findUnique({
                where: {
                    id: params.id
                }
            });

            if (!user) {
                set.status = 404;
                return {
                    error: "User tidak ditemukan"
                };
            }

            // 🔸 Hapus user dari DB
            const deleted = await prisma.users.delete({
                where: {
                    id: params.id
                }
            });

            return {
                message: "User berhasil dihapus",
                data: deleted
            };

        } catch (err) {
            console.error("❌ Gagal hapus user:", err.message);
            set.status = 500;
            return {
                error: "Terjadi kesalahan saat menghapus user"
            };
        }
    },

    // Validasi params ID
    params: t.Object({
        id: t.String()
    })
};