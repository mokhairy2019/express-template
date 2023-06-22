import dotenv from "dotenv";
// config() will read your .env file, parse the contents, assign it to process.env.
dotenv.config();

const configs = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
};

export default configs;
