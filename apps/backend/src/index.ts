import express from "express";

const app = express();

app.use(express.json());

import signin from "./routes/signin";

app.use("/sign-in", signin);

const PORT = 3002;

app.listen(PORT, () => {
    console.log("Server listening at PORT: " + PORT);
});