import { Button } from "../../shared/ui/button"
import { Input } from "../../shared/ui/input"
import styles from "./style.module.css"

export const RegisterTemplate = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>ユーザー登録</h1>
            <form className={styles.form}>
                <div className={styles.area}>
                    <Input
                        type="email"
                        placeholder="メールアドレス"
                    />
                </div>
                <div className={styles.area}>
                    <Input
                        type="password"
                        placeholder="パスワード"
                    />
                </div>
                <div className={styles.area}>
                    <Button type="submit">登録</Button>
                </div>
            </form>
        </div>
    )
}