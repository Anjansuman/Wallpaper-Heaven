import express from "express";

const app = express();

app.use(express.json());

import signin from "./routes/signin";
import signup from "./routes/signup";


app.use("/sign-in", signin);
app.use('/sign-up', signup);

const PORT = 3002;

app.listen(PORT, () => {
    console.log("Server listening at PORT: " + PORT);
});