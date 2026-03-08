import { BrowserRouter, Route, Routes } from "react-router-dom"
import { NAVIGATION_LIST } from "../shared/navigation"
import { TodoListPage } from "../pages/TodoListPage"
import { RegisterPage } from "../pages/RegisterPage"
import { LoginPage } from "../pages/LoginPage"

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={NAVIGATION_LIST.REGISTER} element={<RegisterPage />} />
                <Route path={NAVIGATION_LIST.LOGIN} element={<LoginPage />} />
                <Route path={NAVIGATION_LIST.TOP} element={<TodoListPage />} />
            </Routes>
        </BrowserRouter>
    )
}