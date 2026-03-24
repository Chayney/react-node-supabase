import { useEffect, useState } from "react"
import type { TodoList } from "../../types/todo";
// import { LOCAL_API_URL } from "../../shared/apiClient";
import { BASE_API_URL } from "../../shared/apiClient"
import { Button } from "../../shared/ui/button";
import { useNavigate } from "react-router-dom";
import { NAVIGATION_LIST, NAVIGATION_PATH } from "../../shared/navigation";
import { supabase } from "../../shared/supabaseClient";

export const TodoListTemplate = () => {
    const navigate = useNavigate();
    const [todos, setTodos] = useState<TodoList[]>([]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setTodos([]);
        navigate(NAVIGATION_LIST.LOGIN);
    }

    const handleMoveCreatePage = () => {
        navigate(NAVIGATION_LIST.CREATE);
    }

    const handleMoveDetailPage = (id: number) => {
        // string型が望ましいと思われる
        navigate(`${NAVIGATION_PATH.DETAIL}/${id}`);
    }

    const handleMoveEditPage = (id: number) => {
        // string型が望ましいと思われる
        navigate(`${NAVIGATION_PATH.EDIT}/${id}`);
    }

    // ダミーAPI
    // const fetchData = async () => {
    //     const res = await fetch('http://localhost:3001/todos');
    //     const data = await res.json();
    //     setTodos(data);
    // }

    
    // バックエンド通信
    const fetchData = async () => {
        // supabase-jsにトークン管理を委譲
        const { data: { session } } = await supabase.auth.getSession();
        const accessToken = session?.access_token;

        // BASE_API_URLに変更すれば本番用バックエンドに通信する
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

    // ダミーAPI
    // const handleDeleteTodo = async (id: number) => {
    //     await fetch(`http://localhost:3001/todos/${id}`, {
    //         method: 'DELETE'
    //     });
    //     fetchData();
    // }

    // バックエンド通信
    const handleDeleteTodo = async (id: number) => {
        // supabase-jsにトークン管理を委譲
        const { data: { session } } = await supabase.auth.getSession();
        const accessToken = session?.access_token;

        // BASE_API_URLに変更すれば本番用バックエンドに通信する
        const res = await fetch(`${BASE_API_URL}/todos/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (!res.ok) {
            alert("Failed to delete todo");
            return;
        }

        fetchData();
    }

    return (
        <>
            <h1>Todo List</h1>
            <Button onClick={handleLogout}>ログアウト</Button>
            <Button onClick={handleMoveCreatePage}>作成</Button>
            <ul>
                {todos.map((todo) => {
                    return (
                        <li key={todo.id}>
                            <span>{todo.title}</span>
                            <div>
                                <Button onClick={() => handleMoveDetailPage(todo.id)}>詳細</Button>
                                <Button variant="secondary" onClick={() => handleMoveEditPage(todo.id)}>編集</Button>
                                <Button variant="tertiary" onClick={() => handleDeleteTodo(todo.id)}>削除</Button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}