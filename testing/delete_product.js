console.log("🧨 Hapus ID:", params.id);

const found = await prisma.products.findUnique({
    where: { id: params.id }
});

if (!found) {
    console.log("⚠️ Produk tidak ditemukan");
    set.status = 404;
    return { error: "Produk tidak ditemukan" };
}