import Topic from "../pages/topic";
import Circle from "../pages/circle";
import NotFound from "../pages/error/NotFound";
import Layout from "../pages/layout";
import { Navigate, useRoutes } from "react-router-dom";
import CreateTopic from "../pages/create-topic";
import CreateCircle from "../pages/create-circle";
import Login from "../pages/login";
import Registe from "../pages/registe";
import { TopicManage } from "../pages/topic-manage";
import { Message } from "../pages/message";
import { Chat } from "../pages/chat";
export const routes = [
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        path: "topic",
        element: <Topic />,
      },
      {
        path: "circle",
        element: <Circle></Circle>,
      },
    ],
  },
  {
    path: "/topic-manage",
    element: <TopicManage></TopicManage>,
  },
  {
    path: "/message",
    element: <Message></Message>,
  },
  {
    path: "/chat",
    element: <Chat></Chat>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/registe",
    element: <Registe></Registe>,
  },
  {
    path: "/create-topic",
    element: <CreateTopic />,
  },
  {
    path: "/create-circle",
    element: <CreateCircle />,
  },
  {
    path: "/*",
    element: <NotFound></NotFound>,
  },
];

export default function Router() {
  return useRoutes(routes);
}
