export const generateUniqueID = () => {
    // Generate a random number between 0 and 9999
    const id = Math.floor(Math.random() * 10000);

    // Pad with zeros to ensure 4 digits
    return id.toString().padStart(4, '0');
};