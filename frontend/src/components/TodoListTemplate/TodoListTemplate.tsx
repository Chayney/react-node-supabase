import { useEffect, useState } from "react"
import type { TodoList } from "../../types/todo";
import { Input } from "../../shared/ui/input";
import { BASE_API_URL } from "../../shared/apiClient";
import { Button } from "../../shared/ui/button";
import { useNavigate } from "react-router-dom";
import { NAVIGATION_LIST } from "../../shared/navigation";
import { supabase } from "../../../../backend/node/src/config/supabase"

export const TodoListTemplate = () => {
    const navigate = useNavigate();
    const [todo, setTodo] = useState({ id: 0, title: '', content: '' });
    const [todos, setTodos] = useState<TodoList[]>([]);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        navigate(NAVIGATION_LIST.LOGIN);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const session = supabase.auth.getSession
                    ? await supabase.auth.getSession()
                    : null;
                const accessToken = session?.data?.session?.access_token;
                const res = await fetch(`${BASE_API_URL}/todos`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {})
                    }
                });
                if (!res.ok) {
                    throw new Error(`${res.status} ${res.statusText}`);
                }
                const data = await res.json();
                setTodos(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <h1>Todo List</h1>
            <Button onClick={handleLogout}>ログアウト</Button>
            <ul>
                {todos.map((todo) => {
                    return (
                        <li key={todo.id}>{todo.title}</li>
                    )
                })}
            </ul>
        </>
        
    )
}