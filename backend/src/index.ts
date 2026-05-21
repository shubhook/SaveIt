import express from "express";
import { appRouter } from "./routes";
import { env } from "./utils/env";

const app = express();

app.use(express.json());

app.get('/health', async (req, res) => {
    res.status(200).json({
        ok: true
    });
})

app.use(appRouter);

app.listen(env.PORT, () => {
    console.log(`The Server is running at http://localhost:${env.PORT}`);
})
