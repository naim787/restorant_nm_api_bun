import { prisma } from '../../conf/database.js';
import { generateUniqueID } from '../../services/id_generate.js';
import { Fformproduct }
form '../../services/validator.js'
import { t } from 'elysia';
import { join } from 'path';
import { mkdirSync } from 'fs';

const uploadDir = 'public/uploads';
mkdirSync(uploadDir, { recursive: true });

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

export const createProduct = {
    handler: async({ body, set }) => {
        try {
            const file = body.image_url;
            const buffer = Buffer.from(await file.arrayBuffer());
            const filename = `${Date.now()}.${file.name.split(".").pop()}`;

            await Bun.write(join(uploadDir, filename), buffer);

            const productData = {
                name: body.name,
                category: body.category,
                price: parseFloat(body.price),
                stock: parseInt(body.stock),
                description: body.description,
                id: generateUniqueID(),
                imageUrl: `/uploads/${filename}` // ✅ ini yang penting
            };
            const product = await prisma.products.create({ data: productData });
            set.status = 201;
            return {
                message: "Produk berhasil dibuat!",
                data: product
            };

        } catch (err) {
            console.error("❌ Gagal simpan produk ke DB:", err.message);
            set.status = 500;
            return {
                error: "Gagal menyimpan produk ke database"
            };

            set.status = 201;
            return {
                message: "Produk berhasil dibuat!",
                data: productData
            };
        }
    },

    // Schema untuk validasi
    body: Fformproduct(t)
}