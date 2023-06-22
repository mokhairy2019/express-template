import { IProduct } from "../types/product";
import { PrismaClient } from "@prisma/client";
import ApiError from "../utils/ApiError";

const prisma = new PrismaClient();

export const index = async () => {
  try {
    const products = await prisma.product.findMany();
    return products;
  } catch (error) {
    const apiError = new ApiError(
      409,
      "Failed to fetch all products",
      error instanceof Error
        ? error?.message
        : "error in product.service.ts index() function "
    );
    throw apiError;
  }
};

export const show = async (id: number) => {
  try {
    const product = await prisma.product.findUnique({ where: { id: id } });
    if (!product) throw new Error("Product not found");
    return product;
  } catch (error) {
    const apiError = new ApiError(
      409,
      "Failed to fetch product",
      error instanceof Error
        ? error?.message
        : "error in product.service.ts show() function "
    );
    throw apiError;
  }
};

export const create = async (product: Omit<IProduct, "id">) => {
  try {
    const newProduct = await prisma.product.create({
      data: product,
    });
    console.log(newProduct);
    return newProduct;
  } catch (error) {
    const apiError = new ApiError(
      409,
      "Failed to create product",
      error instanceof Error
        ? error?.message
        : "error in product.service.ts create() function "
    );
    throw apiError;
  }
};

export const remove = async (id: number) => {
  try {
    const product = await prisma.product.delete({ where: { id: id } });
    return true;
  } catch (error) {
    const apiError = new ApiError(
      409,
      "Failed to delete product",
      error instanceof Error
        ? error?.message
        : "error in product.service.ts delete() function "
    );
    throw apiError;
  }
};

export const update = async (
  id: number,
  data: Partial<Omit<IProduct, "id">>
) => {
  try {
    const product = await prisma.product.update({
      where: { id: id },
      data: { ...data },
    });
    return product;
  } catch (error) {
    const apiError = new ApiError(
      409,
      "Failed to update product",
      error instanceof Error
        ? error?.message
        : "error in product.service.ts update() function "
    );
    throw apiError;
  }
};
