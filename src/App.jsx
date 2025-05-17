import { useRoutes } from "react-router"
import { routes } from "./routes"

export const App = () => {
  
  let element = useRoutes(routes)
  
  return (
    <>
      {element}
    </>
  )
}

