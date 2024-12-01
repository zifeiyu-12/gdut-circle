import {
  MessageOutlined,
  UpOutlined,
  UserOutlined,
  UsergroupDeleteOutlined,
} from "@ant-design/icons";
import { Modal, message } from "antd";
import { ReactNode } from "react";
import { upgrade } from "../../../api/user";
import { Users } from "../../../types/user";

export interface MenuItemType {
  title: string;
  icon: ReactNode;
  path?: string;
  onClick?: () => void;
}
export const useMenuItem: (
  onUpgrade: () => void,
  userInfo?: Users
) => MenuItemType[] = (onUpgrade, userInfo) => {
  const handleUpgradeAccount = () => {
    Modal.confirm({
      title: "升级账号",
      content: "是否确认升级账号",
      okText: "确定",
      cancelText: "取消",
      onOk: async () => {
        const { success, message: mes } = await upgrade();
        if (success) {
          message.success(mes);
          onUpgrade();
        }
      },
    });
  };
  return [
    {
      title: "升级账号",
      icon: <UpOutlined />,
      onClick: handleUpgradeAccount,
    },
    {
      title: "圈管理",
      icon: <UsergroupDeleteOutlined />,
      path: "/circle-manage",
    },
    {
      title: "话题管理",
      icon: <UserOutlined />,
      path: "/topic-manage",
    },
    {
      title: "消息",
      icon: <MessageOutlined />,
      path: "/message",
    },
  ];
};
