import { Route } from "@tanstack/react-location";
import { Home } from "../domains/hotwheels/features/Home";
import { Login } from "../domains/user/features/login";
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
        <Home />
      </Protected>
    ),
  },
];
