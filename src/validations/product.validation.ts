import { z } from "zod";

//zod schema with required name field and number price field

export const createProductSchema = {
  body: z.object({
    name: z.string(),
    price: z.number(),
  }),
  //   params: { id: idSchema },
  //   query: { userId: idSchema },
};
export type ICreateProductBody = z.infer<typeof createProductSchema.body>;

export const getProductSchema = {
  params: z.object({ id: z.string() }),
};
export type IGetProductParams = z.infer<typeof getProductSchema.params>;

export const deleteProductSchema = {
  params: z.object({ id: z.string() }),
};
export type IDeleteProductParams = z.infer<typeof deleteProductSchema.params>;

export const updateProductSchema = {
  body: z
    .object({
      name: z.string(),
      price: z.number(),
    })
    .partial()
    .refine(
      (data:any) => data.name || data.price,
      "Either name or price should be filled in."
    ),
  params: z.object({ id: z.string() }),
};
export type IUpdateProductParams = z.infer<typeof updateProductSchema.params>;
export type IUpdateProductBody = z.infer<typeof updateProductSchema.body>;
