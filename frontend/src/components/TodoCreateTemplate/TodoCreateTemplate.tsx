import { useState } from "react"
import { Input } from "../../shared/ui/input"
import { Label } from "../../shared/ui/label"
import { useNavigate } from "react-router-dom"
import { Button } from "../../shared/ui/button"
import { NAVIGATION_LIST } from "../../shared/navigation"
import { supabase } from "../../shared/supabaseClient"
import { LOCAL_API_URL } from "../../shared/apiClient"
// import { BASE_API_URL } from "../../shared/apiClient"

export const TodoCreateTemplate = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const inputTitle = (event: React.ChangeEvent<HTMLInputElement>) => setTitle(event.target.value);

    const inputContent = (event: React.ChangeEvent<HTMLInputElement>) => setContent(event.target.value);

    // ダミーAPI
    // const handleAddTodo = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    //     event.preventDefault();

    //     const newTodo = (title: string, content: string) => {
    //         return {
    //             title: title, 
    //             content: content
    //         }
    //     }

    //     try {
    //         await fetch('http://localhost:3001/todos', {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify(newTodo(title, content))
    //         });
    //         navigate(NAVIGATION_LIST.TOP);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    // バックエンド通信
    const handleAddTodo = async (event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();

        // supabase-jsにトークン管理を委譲
        const { data: { session } } = await supabase.auth.getSession();
        const accessToken = session?.access_token;

        // BASE_API_URLに変更すれば本番用バックエンドに通信する
        const res = await fetch(`${LOCAL_API_URL}/todos`, {
            method: "POST",
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
            alert("Failed to create todo");
            return;
        }

        await res.json();
        navigate(NAVIGATION_LIST.TOP);
    }

    return (
        <>
            <h1>Todo Create</h1>
            <form onSubmit={handleAddTodo}>
                <div>
                    <Label>Title</Label>
                    <Input onChange={inputTitle} value={title}/>
                </div>
                <div>
                    <Label>Content</Label>
                    <Input onChange={inputContent} value={content}/>
                </div>
                <Button>作成</Button>
            </form>
        </>
    )
}