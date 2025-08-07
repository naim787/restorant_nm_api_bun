import { prisma } from '....//conf/database.js';
import { generateUniqueID } from '../services/idGenerator.js';

export const createProduct = async({ body, set }) => {
    try {
        const productData = {
            ...body,
            id: generateUniqueID()
        };

        const product = await prisma.products.create({
            data: productData
        });

        set.status = 201;
        return {
            message: "Product created successfully",
            data: product
        };
    } catch (error) {
        set.status = 500;
        return {
            error: "Failed to create product"
        };
    }
};