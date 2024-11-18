import { TabBarItemProps } from "antd-mobile";
import { KoubeiOutline, AppOutline } from "antd-mobile-icons";
interface TabBarConfigType extends TabBarItemProps {
  key: string;
}
export const tabBarConfig: TabBarConfigType[] = [
  {
    key: "/topic",
    title: "话题",
    icon: <KoubeiOutline />,
  },
  {
    title: "圈子",
    icon: <AppOutline />,
    key: "/circle",
  },
];
