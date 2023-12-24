
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Chunked from "./components/Chunked/Chunked";
import History from "./components/History/History";
import './App.css';


function App() {
 
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Chunked />,
    },
    {
      path: "/history",
      element: <History />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;