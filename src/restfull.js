const res = await fetch(`http://localhost:3000/users/1687`, {
    method: "DELETE"
});
try {
    const data = await res.json();
    console.log("Response:", data);
} catch (err) {
    console.error("Gagal parse JSON:", err.message);
}