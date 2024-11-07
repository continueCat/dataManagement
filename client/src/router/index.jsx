import { createBrowserRouter } from "react-router-dom";
import LayoutApp from "../pages/Layout";
import Login from "../pages/Login";
import DataDetails from "../pages/DataDetails";
import TagsDetails from "../pages/TagsDetails";

import { AuthorRoute } from "../components/AuthorRoute";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        //将Layout组件包裹起来当作children组件传参
        <AuthorRoute>
          <LayoutApp />
        </AuthorRoute>
      ),
      children: [
        {
          path: "Data",
          element: <DataDetails></DataDetails>,
        },
        {
          path: "Tags",
          element: <TagsDetails></TagsDetails>,
        },
      ],
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
