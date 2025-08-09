import { unlinkSync, existsSync } from 'fs';
import { join } from 'path';

const imagePath = join('../../../public', "/uploads/1754626992720.webp"); // misalnya 'public/uploads/123.jpg'

if (existsSync(imagePath)) {
    unlinkSync(imagePath);
    console.log("🧹 Gambar dihapus:", imagePath);
} else {
    console.warn("⚠️ File gambar tidak ditemukan:", imagePath);
}