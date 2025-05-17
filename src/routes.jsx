import { Navigate } from "react-router";
import { HomePage } from "./pages/HomePage";

export const routes = [
    {path: "/", element: <HomePage/>},
    {path: "/homePage", element: <Navigate to={"/"}/>}
]