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