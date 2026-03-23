import express from "express";
import cors from "cors";
import { authRouter } from "./routes/auth";
import { todoRouter } from "./routes/todo";

export const app = express();

export const start = async () => {
    const PORT =
        process.env.NODE_ENV === "production"
            ? process.env.PORT
            : process.env.LOCAL_PORT;
    const FRONTEND_URL =
        process.env.NODE_ENV === "production"
            ? process.env.FRONTEND_URL
            : process.env.LOCAL_FRONTEND_URL;

    try {
        // CORS設定
        app.use(cors({
            origin: FRONTEND_URL,
            credentials: true,
        }));

        app.use(express.json());

        app.use('/api', authRouter);
        app.use('/api', todoRouter);

        // nodeの起動とcors設定の確認
        app.listen(PORT, () => {
            console.log(`✅ Listening on ${PORT}`);
            console.log(`✅ Listening on ${FRONTEND_URL}`);
        });
    } catch (error) {
        console.error('Internal Server Error', error);
    }
};

start();
