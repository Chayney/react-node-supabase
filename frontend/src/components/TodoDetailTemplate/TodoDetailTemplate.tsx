import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Label } from "../../shared/ui/label";
import { Input } from "../../shared/ui/input";
import { NAVIGATION_LIST } from "../../shared/navigation";
import { Button } from "../../shared/ui/button";
import { supabase } from "../../shared/supabaseClient";
import { BASE_API_URL } from "../../shared/apiClient";
// import { LOCAL_API_URL } from "../../shared/apiClient";

export const TodoDetailTemplate = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    // ダミーAPI
    // const fetchData = async () => {
    //     const res = await fetch(`http://localhost:3001/todos/:id`);
    //     const data = await res.json();
    //     setTodos(data);
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

    const handleMoveTopPage = () => {
        navigate(NAVIGATION_LIST.TOP);
    }

    useEffect(() => {
        fetchData()
    }, [id]);

    return (
        <>
            <h1>Todo Detail</h1>
            <div>
                <Label>Title</Label>
                <Input value={title} readOnly />
            </div>
            <div>
                <Label>Content</Label>
                <Input value={content} readOnly />
            </div>
            <Button onClick={handleMoveTopPage}>TOPに戻る</Button>
        </>
    )
}