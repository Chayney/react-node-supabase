import { BrowserRouter, Route, Routes } from "react-router-dom"
import { NAVIGATION_LIST } from "../shared/navigation"
import { TodoListPage } from "../pages/TodoListPage"

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={NAVIGATION_LIST.TOP} element={<TodoListPage />} />
            </Routes>
        </BrowserRouter>
    )
}