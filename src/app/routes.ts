import { createBrowserRouter } from "react-router";
import { Root } from "./components/layout/Root";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Projects } from "./pages/Projects";
import { DevLog } from "./pages/DevLog";
import { Learning } from "./pages/Learning";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "projects", Component: Projects },
      { path: "devlog", Component: DevLog },
      { path: "learning", Component: Learning },
      { path: "*", Component: NotFound },
    ],
  },
]);
