import express from "express";
import verifyAuthToken from "@/middleware/verifyAuthToken";
import {
  getAllProductsHandler,
  getProductHandler,
  createProductHandler,
  deleteProductHandler,
  updateProductHandler,
} from "@/controllers/product.controller";

import { validate } from "@/middleware/validate";
import {
  createProductSchema,
  getProductSchema,
  deleteProductSchema,
  updateProductSchema,
} from "@/validations/product.validation";

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
