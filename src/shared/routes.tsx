import { Route } from "@tanstack/react-location";
import App from "../App";
import Login from "../domains/user/features/login";
import { Protected } from "./components/Protected";

export const routes: Route[] = [
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <Protected>
        <App />
      </Protected>
    ),
  },
];
