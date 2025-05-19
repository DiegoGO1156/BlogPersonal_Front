import { Navigate } from "react-router";
import { HomePage } from "./pages/HomePage";
import CoursePublicationsPage from "./pages/PublicationPage";

export const routes = [
    {path: "/", element: <HomePage/>},
    {path: "/homePage", element: <Navigate to={"/"}/>},
    {path: "/courses/:courseName/publications", element: <CoursePublicationsPage />}
]