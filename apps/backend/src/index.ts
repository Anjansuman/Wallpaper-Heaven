import express from "express";

const app = express();

app.use(express.json());

import product from "./routes/product";
import tag from "./routes/tag";

app.use("/products", product);
app.use("/tags", tag);

const PORT = 8080;

app.listen(PORT, () => {
    console.log("Server listening at PORT: " + PORT);
});