import { Request, Response, NextFunction } from "express";
import {
  index,
  show,
  create,
  remove,
  update,
} from "@/services/product.service";
import { asyncHandler } from "@/utils/asyncHandler";

import IResponse from "@/types/Response";
import { IProduct } from "@/types/product";
import {
  ICreateProductBody,
  IDeleteProductParams,
  IGetProductParams,
  IUpdateProductParams,
  IUpdateProductBody,
} from "@/validations/product.validation";

export const getAllProductsHandler = asyncHandler(
  async (_req: Request, res: Response) => {
    const products = await index();

    const response: IResponse = { success: true, data: products };
    res.json(response);
  }
);

export const getProductHandler = asyncHandler(
  async (req: Request<IGetProductParams, {}, {}>, res: Response<IResponse>) => {
    const id = parseInt(req.params.id);
    const product = await show(id);

    const response = { success: true, data: product };
    res.json(response);
  }
);

export const createProductHandler = asyncHandler(
  async (
    req: Request<{}, {}, ICreateProductBody>,
    res: Response<IResponse>
  ) => {
    const product: Omit<IProduct, "id"> = {
      name: req.body.name as string,
      price: req.body.price as unknown as number,
    };

    const newProduct = await create(product);

    const response = { success: true, data: newProduct };
    res.json(response);
  }
);

export const deleteProductHandler = asyncHandler(
  async (
    req: Request<IDeleteProductParams, {}, {}>,
    res: Response<IResponse>
  ) => {
    const id = parseInt(req.params.id);
    await remove(id);

    const response = { success: true };
    res.json(response);
  }
);

export const updateProductHandler = asyncHandler(
  async (
    req: Request<IUpdateProductParams, {}, IUpdateProductBody>,
    res: Response<IResponse>
  ) => {
    const id = parseInt(req.params.id);
    const updatedProduct = await update(id, req.body);

    const response = { success: true, data: updatedProduct };
    res.json(response);
  }
);
