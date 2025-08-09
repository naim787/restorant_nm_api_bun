import { test, expect } from "bun:test";

test("hapus user", async() => {
    const userId = "1689"; // ID user yang mau dihapus

    const res = await fetch(`http://localhost:3000/users/${userId}`, {
        method: "DELETE"
    });

    // Pastikan status HTTP benar
    expect(res.status).toBe(200);

    const data = await res.json();

    // Pastikan responnya sesuai
    expect(data).toHaveProperty("message", "User berhasil dihapus");
    expect(data).toHaveProperty("data");
    expect(data.data).toHaveProperty("id", userId);
});