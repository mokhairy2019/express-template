import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import productRouter from "./routes/v1";
import { errorConverter, errorHandler } from "./middleware/error";
import ApiError from "./utils/ApiError";
import httpStatus from "http-status";
import routes from "@/routes/v1";

const app: express.Application = express();
const address = "0.0.0.0:3000";

app.use(bodyParser.json());

app.get("/", function (_req: Request, res: Response) {
  res.send("This is homepage of storefront project");
});

app.use("/api/v1", routes);

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  const myError = new ApiError(httpStatus.NOT_FOUND, "Not found", "Not found");
  next(myError);
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

export default app;
