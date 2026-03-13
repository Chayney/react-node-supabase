import { useEffect, useState } from "react"
import type { TodoList } from "../../types/todo";
import { BASE_API_URL } from "../../shared/apiClient";
import { Button } from "../../shared/ui/button";
import { useNavigate } from "react-router-dom";
import { NAVIGATION_LIST } from "../../shared/navigation";
import { supabase } from "../../shared/supabaseClient";

export const TodoListTemplate = () => {
    const navigate = useNavigate();
    // const [todo, setTodo] = useState({ id: 0, title: '', content: '' });
    const [todos, setTodos] = useState<TodoList[]>([]);

    // const [title, setTitle] = useState('');
    // const [content, setContent] = useState('');

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setTodos([]);
        navigate(NAVIGATION_LIST.LOGIN);
    }

    const fetchData = async () => {
        // supabase-jsにトークン管理を委譲
        const { data: { session } } = await supabase.auth.getSession();
        const accessToken = session?.access_token;
        const res = await fetch(`${BASE_API_URL}/todos`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            }
        });
        if (!res.ok) {
            alert('Failed to fetch todos');
            return;
        }
        const data = await res.json();
        setTodos(data);
    };

    useEffect(() => {
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