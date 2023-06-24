import {
  ICreateProductBody,
  IDeleteProductParams,
  IGetProductParams,
  IUpdateProductBody,
  IUpdateProductParams,
} from "@/validations/product.validation";
import { NextFunction, Request, Response } from "express";
import {
  create,
  index,
  remove,
  show,
  update,
} from "@/services/product.service";

import { IProduct } from "@/types/product";
import IResponse from "@/types/Response";
import { asyncHandler } from "@/utils/asyncHandler";

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
      name: req.body.name,
      price: req.body.price,
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
