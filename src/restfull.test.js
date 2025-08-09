// tes.js
const userId = "123";

const res = await fetch(`http://localhost:3000/users/${userId}`, {
    method: "DELETE"
});

console.log("Status:", res.status);

try {
    const data = await res.json();
    console.log("Response:", data);
} catch (err) {
    console.error("Gagal parse JSON:", err.message);
}