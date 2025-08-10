// Cek batas stok sebelum simpan
const stockNumber = parseInt(b); // ubah string ke number

if (isNaN(stockNumber) || stockNumber > 1000000) {
    set.status = 400;
    return { error: "Stock tidak boleh lebih dari 1.000.000" };
}
export function Fformproduct(t) {
    return t.Object({
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