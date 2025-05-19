import { Navigate } from "react-router";
import { HomePage } from "./pages/HomePage";
import CoursePublicationsPage from "./pages/PublicationPage";
import PublicationDetailPage from "./pages/PublicationDetails";

export const routes = [
    {path: "/", element: <HomePage/>},
    {path: "/homePage", element: <Navigate to={"/"}/>},
    {path: "/courses/:courseName/publications", element: <CoursePublicationsPage />},
    {path: "/courses/:courseName/publications/:publicationId", element: <PublicationDetailPage />}
]