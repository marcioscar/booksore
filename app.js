import express from "express";
import cors from "cors";
import winston from "winston";
import ClientRouter from "./routes/client.routes.js";
import AuthorRouter from "./routes/author.routes.js";
import BookRouter from "./routes/book.routes.js";
import SaleRouter from "./routes/sale.routes.js";
import basicAuth from "express-basic-auth";
import { authorizer, authorize } from "./controllers/auth.controller.js";
const { combine, timestamp, label, printf } = winston.format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level} ${message}`;
});

global.logger = winston.createLogger({
  level: "silly",
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "store.log" }),
  ],
  format: combine(label({ label: "store" }), timestamp(), myFormat),
});

const app = express();
app.use(express.json());
app.use(cors());

app.use(basicAuth({ authorizeAsync: true, authorizer }));
app.use("/client", ClientRouter);
app.use("/author", authorize("admin", "client"), AuthorRouter);
app.use("/book", BookRouter);
app.use("/sale", SaleRouter);

app.use((err, req, res, next) => {
  logger.error(`${req.method} ${req.baseUrl} -  ${err.message}`);
  res.status(400).send({ error: err.message });
});

// app.listen(3000, () => console.log("API STARTED @3000"));
export default app;
