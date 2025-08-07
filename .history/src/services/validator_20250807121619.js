export const Fformproduct(t) => {
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