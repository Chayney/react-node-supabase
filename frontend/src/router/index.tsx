import { BrowserRouter, Route, Routes } from "react-router-dom"
import { NAVIGATION_LIST } from "../shared/navigation"
import { TodoListPage } from "../pages/TodoListPage"
import { RegisterPage } from "../pages/RegisterPage"
import { LoginPage } from "../pages/LoginPage"
import { TodoCreatePage } from "../pages/TodoCreatePage"
import { TodoEditPage } from "../pages/TodoEditPage"
import { TodoDetailPage } from "../pages/TodoDetailPage"

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={NAVIGATION_LIST.REGISTER} element={<RegisterPage />} />
                <Route path={NAVIGATION_LIST.LOGIN} element={<LoginPage />} />
                <Route path={NAVIGATION_LIST.TOP} element={<TodoListPage />} />
                <Route path={NAVIGATION_LIST.CREATE} element={<TodoCreatePage />} />
                <Route path={NAVIGATION_LIST.EDIT} element={<TodoEditPage />} />
                <Route path={NAVIGATION_LIST.DETAIL} element={<TodoDetailPage />} />
            </Routes>
        </BrowserRouter>
    )
}