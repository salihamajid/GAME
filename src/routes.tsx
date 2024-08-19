import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import GameDetailPage from "./pages/GameDetailPage";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";
import Login from "./components/Login";
import Signup from "./components/Signup";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'games/:slug', element: <GameDetailPage /> },
      { path: 'login', element:<Login/> },
      { path: 'signup', element:<Signup/> }
    ]
  }
]);

export default router;