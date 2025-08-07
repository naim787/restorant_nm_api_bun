import { prisma } from '../../conf/database.js';
import { generateUniqueID } from '../../services/id_generate.js';
import { t } from 'elysia';
import { join } from 'path';
import { mkdirSync } from 'fs';

const uploadDir = 'public/uploads';
mkdirSync(uploadDir, { recursive: true });

export const createProduct = {
    // Handler function
    handler: async({ body, set }) => {
        console.log("🔥 MASUK HANDLER");
        console.log("📦 body keys:", Object.keys(body));
        console.log("📷 file:", body.image_url);

        const file = body.image_url;
        const buffer = Buffer.from(await file.arrayBuffer());
        const filename = `${Date.now()}.${file.name.split(".").pop()}`;

        await Bun.write(join(uploadDir, filename), buffer);

        const productData = {
            ...body,
            id: generateUniqueID(),
            image_url: `/uploads/${filename}`
        };

        await prisma.products.create({ data: productData });

        set.status = 201;
        return {
            message: "Produk berhasil dibuat!",
            data: productData
        };
    },

    // Schema untuk validasi
    body: t.Object({
        name: t.String(),
        category: t.String(),
        price: t.String(),
        stock: t.String(),
        description: t.String(),
        admin_id: t.String(),
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
}