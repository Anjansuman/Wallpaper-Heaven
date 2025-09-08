import express from "express";
import "./routes-2/offerCleanup";
import cors from "cors";
import router from "./routes/route";

const app = express();

app.use(express.json());

app.use(cors());

app.use('/api/v1', router);

const PORT = 8080;

app.listen(PORT, () => {
    console.log("Server listening at PORT: " + PORT);
});