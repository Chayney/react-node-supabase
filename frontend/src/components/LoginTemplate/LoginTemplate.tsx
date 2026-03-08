import { useState } from "react";
import { Button } from "../../shared/ui/button"
import { Input } from "../../shared/ui/input"
import styles from "./style.module.css"
import { useNavigate } from "react-router-dom";
import { NAVIGATION_LIST } from "../../shared/navigation";
import { supabase } from "../../shared/supabaseClient";

export const LoginTemplate = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const inputEmail = (event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value);

    const inputPassword = (event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value);

    const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password
        });
        
        if (error) throw error;
        navigate(NAVIGATION_LIST.TOP);
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