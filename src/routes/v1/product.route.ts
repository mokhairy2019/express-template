import {
  createProductHandler,
  deleteProductHandler,
  getAllProductsHandler,
  getProductHandler,
  updateProductHandler,
} from "@/controllers/product.controller";
import {
  createProductSchema,
  deleteProductSchema,
  getProductSchema,
  updateProductSchema,
} from "@/validations/product.validation";

import express from "express";
import { validate } from "@/middleware/validate";
import verifyAuthToken from "@/middleware/verifyAuthToken";

const productRouter = express.Router();

productRouter.route("/").get(getAllProductsHandler);

productRouter
  .route("/")
  .post(validate(createProductSchema), createProductHandler);

productRouter.route("/:id").get(validate(getProductSchema), getProductHandler);

productRouter
  .route("/:id")
  .delete(validate(deleteProductSchema), deleteProductHandler);

productRouter
  .route("/:id")
  .put(validate(updateProductSchema), updateProductHandler);

export default productRouter;
