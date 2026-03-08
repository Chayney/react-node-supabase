import { useState } from "react";
import { Button } from "../../shared/ui/button"
import { Input } from "../../shared/ui/input"
import styles from "./style.module.css"
import { useNavigate } from "react-router-dom";
import { NAVIGATION_LIST } from "../../shared/navigation";
import { BASE_API_URL } from "../../shared/apiClient";

export const LoginTemplate = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const inputEmail = (event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value);

    const inputPassword = (event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value);

    const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(BASE_API_URL)
        try {
            const response = await fetch(`${BASE_API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            if (response.ok) {
                // JWTをlocalStorageに保存（または必要に応じてcookieに）
                localStorage.setItem("access_token", data.access_token);
                localStorage.setItem("refresh_token", data.refresh_token);
                navigate(NAVIGATION_LIST.TOP);
            } else {
                alert(data.error || "ログインに失敗しました");
            }
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>ユーザーログイン</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.area}>
                    <Input
                        type="email"
                        placeholder="メールアドレス"
                        value={email}
                        onChange={inputEmail}
                    />
                </div>
                <div className={styles.area}>
                    <Input
                        type="password"
                        placeholder="パスワード"
                        value={password}
                        onChange={inputPassword}
                    />
                </div>
                <div className={styles.area}>
                    <Button type="submit">ログイン</Button>
                </div>
            </form>
        </div>
    )
}