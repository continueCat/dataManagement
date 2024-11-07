import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";
import Login from "../pages/Login";

import { AuthorRoute } from "../components/AuthorRoute";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        //将Layout组件包裹起来当作children组件传参
        <AuthorRoute>
          <Layout />
        </AuthorRoute>
      ),
    },
    {
      path: "/login",
      element: <Login />,
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

export default router;
