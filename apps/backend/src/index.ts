import express from "express";
import { adminMiddleware } from "./middleware/adminMiddleware";

const app = express();

app.use(express.json());

import product from "./routes/product";
import tag from "./routes/tag";
import brand from "./routes/brand";
import creator from "./routes/creator";

import help from "./routes/helping";

app.use("/help", adminMiddleware, help);
app.use("/products", adminMiddleware, product);
app.use("/tags", adminMiddleware, tag);
app.use("/brands", adminMiddleware, brand);
app.use("/creators", adminMiddleware, creator);

const PORT = 8080;

app.listen(PORT, () => {
    console.log("Server listening at PORT: " + PORT);
});