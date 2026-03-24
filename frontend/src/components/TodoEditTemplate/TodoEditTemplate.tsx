import { useEffect, useState } from "react"
import { Button } from "../../shared/ui/button"
import { Input } from "../../shared/ui/input"
import { Label } from "../../shared/ui/label"
import { useNavigate, useParams } from "react-router-dom"
import { NAVIGATION_LIST } from "../../shared/navigation"
import { supabase } from "../../shared/supabaseClient"
import { BASE_API_URL } from "../../shared/apiClient"
// import { LOCAL_API_URL } from "../../shared/apiClient"

export const TodoEditTemplate = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const inputTitle = (event: React.ChangeEvent<HTMLInputElement>) => setTitle(event.target.value);

    const inputContent = (event: React.ChangeEvent<HTMLInputElement>) => setContent(event.target.value);

    // ダミーAPI
    // const fetchData = async () => {
    //     const res = await fetch(`http://localhost:3001/todos/${id}`);
    //     const todo = await res.json();

    //     if (todo) {
    //         setTitle(todo.title);
    //         setContent(todo.content);
    //     }
    // }

    // バックエンド通信
    const fetchData = async () => {
        // supabase-jsにトークン管理を委譲
        const { data: { session } } = await supabase.auth.getSession();
        const accessToken = session?.access_token;

        // BASE_API_URLに変更すれば本番用バックエンドに通信する
        const res = await fetch(`${BASE_API_URL}/todos/${id}`, {
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
        setTitle(data.title);
        setContent(data.content);
    };

    useEffect(() => {
        fetchData()
    }, [id]);

    // ダミーAPI
    // const handleEditTodo = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    //     event.preventDefault();

    //     const newTodo = (todoId: number, title: string, content: string) => {
    //         return {
    //             id: todoId,
    //             title: title, 
    //             content: content
    //         }
    //     }

    //     try {
    //         await fetch(`http://localhost:3001/todos/${id}`, {
    //             method: 'PUT',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify(newTodo(todoId, title, content))
    //         });
    //         navigate(NAVIGATION_LIST.TOP);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    // バックエンド通信
    const handleEditTodo = async (event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();

        // supabase-jsにトークン管理を委譲
        const { data: { session } } = await supabase.auth.getSession();
        const accessToken = session?.access_token;

        // BASE_API_URLに変更すれば本番用バックエンドに通信する
        const res = await fetch(`${BASE_API_URL}/todos/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            // フロントエンドでuser_idは扱わない(セキュリティ的に)
            body: JSON.stringify({
                title,
                content
            }),
        });

        if (!res.ok) {
            alert("Failed to update todo");
            return;
        }

        await res.json();
        navigate(NAVIGATION_LIST.TOP);
    }

    return (
        <>
            <h1>Todo Edit</h1>
            <form onSubmit={handleEditTodo}>
                <div>
                    <Label>Title</Label>
                    <Input onChange={inputTitle} value={title} />
                </div>
                <div>
                    <Label>Content</Label>
                    <Input onChange={inputContent} value={content} />
                </div>
                <Button>編集</Button>
            </form>
        </>
    )
}