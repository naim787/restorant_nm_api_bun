import { prisma } from '../../conf/database.js';
import { generateUniqueID } from '../../services/id_generate.js';
import { t } from 'elysia';

export const createProduct = async({ body, set }) => {
    console.log("🔥 MASUK HANDLER");

    console.log("📦 body keys:", Object.keys(body));
    console.log("📷 file:", body.image_url);

    const file = body.image_url;
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${Date.now()}.${file.name.split(".").pop()}`;

    await Bun.write(`public/uploads/${filename}`, buffer);

    return {
        message: "Sukses simpan file",
        file_url: `/uploads/${filename}`
    };


};

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
        ],
        maxSize: 5 * 1024 * 1024 // max 5MB
    })
})