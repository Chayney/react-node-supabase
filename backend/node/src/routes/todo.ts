import { supabase } from "../config/supabase";
import { authMiddleware } from "../middleware/auth";
import { Request, Response, Router } from "express";

export const todoRouter = Router();

todoRouter.get('/todos', authMiddleware, async (req: Request, res: Response) => {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    const userId = req.user.id;
    const { data, error } = await supabase
        .from('todos')
        .select('*')
        .eq('user_id', userId)
    if (error) {
        return res.status(500).json({ error: error.message });
    }

    return res.status(200).json(data);
});

todoRouter.get('/todos/:id', authMiddleware, async (req: Request, res: Response) => {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    const userId = req.user.id;
    const { id } = req.params;
    const todoId = Number(id);
    const { data, error } = await supabase
        .from('todos')
        .select()
        .eq('id', todoId)
        .eq('user_id', userId)
        .single();
    if (error) {
        return res.status(500).json({ error: error.message });
    }

    return res.status(200).json(data);
});

todoRouter.post('/todos', authMiddleware, async (req: Request, res: Response) => {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    const userId = req.user.id;
    const { title, content } = req.body;
    const { data, error } = await supabase
        .from('todos')
        .insert([
            {
                title,
                content,
                user_id: userId
            }
        ]);
    if (error) {
        return res.status(500).json({ error: error.message });
    }

    return res.status(200).json(data);
});

todoRouter.put('/todos/:id', authMiddleware, async (req: Request, res: Response) => {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    const userId = req.user.id;
    const { id } = req.params;
    const todoId = Number(id);
    const { title, content } = req.body;
    const { data, error } = await supabase
        .from('todos')
        .update({
            title,
            content
        })
        .eq('id', todoId)
        .eq('user_id', userId)
        .select()
        .single();
    if (error) {
        return res.status(500).json({ error: error.message });
    }

    return res.status(200).json(data);
});

todoRouter.delete('/todos/:id', authMiddleware, async (req: Request, res: Response) => {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    const userId = req.user.id;
    const { id } = req.params;
    const todoId = Number(id);
    const { data, error } = await supabase
        .from('todos')
        .delete()
        .eq('id', todoId)
        .eq('user_id', userId);
    if (error) {
        return res.status(500).json({ error: error.message });
    }

    return res.status(200).json(data);
});