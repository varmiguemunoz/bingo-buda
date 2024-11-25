import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import lazyLoading from "@/utils/lazyLoading";
import useUsers from "@/hooks/useUsers";

type privateProps = {
  element: React.JSX.Element;
  redirectRoute?: string;
};

export const Private = ({
  element,
  redirectRoute = "/login",
}: privateProps) => {
  const { currentUser } = useUsers();

  if (!currentUser || Object.keys(currentUser).length === 0)
    return <Navigate to={redirectRoute} />;

  return element;
};

export const ValidateSession = ({
  element,
  redirectRoute = "/home/dashboard",
}: privateProps) => {
  const { currentUser } = useUsers();

  if (!currentUser || Object.keys(currentUser).length === 0) return element;

  if (currentUser) return <Navigate to={redirectRoute} />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: lazyLoading("App"),
    children: [
      {
        path: "/",
        element: <Navigate to="/login" />,
      },
      {
        path: "login",
        element: <ValidateSession element={lazyLoading("Login")} />,
      },
      {
        path: "register",
        element: <ValidateSession element={lazyLoading("Register")} />,
      },
      {
        path: "/home",
        element: <Private element={lazyLoading("Home")} />,
        children: [
          {
            path: "/home",
            element: <Navigate to="/home/dashboard" />,
          },
          {
            path: "dashboard",
            element: <Private element={lazyLoading("Dashboard")} />,
          },
          {
            path: "game/:id",
            element: <Private element={lazyLoading("GameLayout")} />,
            children: [
              {
                path: "",
                element: <Private element={lazyLoading("Game")} />,
              },
              {
                path: "room/:roomId",
                element: <Private element={lazyLoading("Room")} />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: lazyLoading("404"),
  },
]);

export default function Routes() {
  return <RouterProvider router={router} />;
}
