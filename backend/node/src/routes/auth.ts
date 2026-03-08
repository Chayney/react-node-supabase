import { supabase } from "../config/supabase";
import { Router, Request, Response } from "express";

export const authRouter = Router();

// supabase auth 
// ユーザー登録
authRouter.post('/register', async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const { data, error } = await supabase.auth.signUp({
        email,
        password
    });
    if (error) {
        return res.status(400).json({ error: error.message });
    }

    return res.status(200).json(data);
});

// ユーザーログイン
authRouter.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });
    console.log(data);
    if (error) {
        return res.status(400).json({ error: error.message });
    }

    return res.status(200).json(data);
});