import { prisma } from '../../conf/database.js';
import { generateUniqueID } from '../../services/id_generate.js';
import { t } from 'elysia';
import { join } from 'path';
import { mkdirSync } from 'fs';

const uploadDir = 'public/uploads';
mkdirSync(uploadDir, { recursive: true });

export const createProduct = {
    handler: async({ body, set }) => {
        console.log("🔥 MASUK HANDLER");

        const file = body.image_url;
        const buffer = Buffer.from(await file.arrayBuffer());
        const filename = `${Date.now()}.${file.name.split(".").pop()}`;
        const filepath = join(uploadDir, filename);

        await Bun.write(filepath, buffer);

        const imageUrl = `/uploads/${filename}`; // ← cocok dengan field imageUrl (camelCase) di Prisma

        const productData = {
            id: generateUniqueID(),
            name: body.name,
            category: body.category,
            price: parseFloat(body.price), // konversi wajib
            stock: parseInt(body.stock), // konversi wajib
            description: body.description,
            imageUrl // ← field dari schema
        };

        const product = await prisma.products.create({
            data: productData
        });

        set.status = 201;
        return {
            message: "Produk berhasil dibuat dan disimpan ke DB!",
            data: product
        };
    },

    body: t.Object({
        name: t.String(),
        category: t.String(),
        price: t.String(), // dikirim dari FE sebagai string, akan dikonversi
        stock: t.String(),
        description: t.String(),
        admin_id: t.String(), // opsional, belum dipakai
        image_url: t.File({
            type: [
                'image/png',
                'image/jpeg',
                'image/webp',
                'image/svg+xml',
                'image/gif'
            ]
        })
    })
};