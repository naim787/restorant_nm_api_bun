import { t } from 'elysia'
import { join } from 'path'
import { mkdirSync } from 'fs'
import { BunFile } from 'bun' // opsional
import { generateUniqueID } from '../../services/id_generate.js'

const uploadDir = './public/uploads'
mkdirSync(uploadDir, { recursive: true })

export const createProduct = {
    handler: async({ body, set }) => {
        try {
            const imageFile = body.image_url

            // Simpan file ke folder uploads
            const ext = imageFile.name.split('.').pop()
            const filename = `${Date.now()}.${ext}`
            const filepath = join(uploadDir, filename)

            const buffer = Buffer.from(await imageFile.arrayBuffer())
            await Bun.write(filepath, buffer)

            // Gabungkan data produk
            const productData = {
                id: generateUniqueID(),
                name: body.name,
                category: body.category,
                price: parseInt(body.price),
                stock: parseInt(body.stock),
                description: body.description,
                admin_id: body.admin_id,
                image_url: `/uploads/${filename}` // URL ke file yang di-upload
            }

            // Simpan ke DB di sini (sementara hanya log)
            console.log(productData)

            set.status = 201
            return {
                message: 'Produk berhasil dibuat!',
                data: productData
            }

        } catch (error) {
            console.error(error)
            set.status = 500
            return {
                error: 'Gagal membuat produk'
            }
        }
    },

    // Schema validasi form
    body: t.Object({
        name: t.String(),
        category: t.String(),
        price: t.String(),
        stock: t.String(),
        description: t.String(),
        admin_id: t.String(),
        image_url: t.File({ type: 'image' })
    })
}