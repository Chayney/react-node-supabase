import express from "express";
import cors from "cors";
import { authRouter } from "./routes/auth";
import { todoRouter } from "./routes/todo";

export const app = express();

export const start = async () => {
    const PORT =
        process.env.NODE_ENV === "production"
            ? process.env.PORT || 8080
            : 3000;
    const FRONTEND_URL =
        process.env.NODE_ENV === "production"
            ? process.env.FRONTEND_URL
            : "http://localhost:5173";

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
        console.error('DB connection error', error);
    }
};

if (process.env.NODE_ENV !== 'test') {
    start();
}