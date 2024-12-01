import { useCallback, useEffect, useState } from "react";
import { TopicDetail } from "../../components/topic-detail";
import { getTopicList } from "../../api/topic";
import { useRequest } from "ahooks";
import { TopicData, Topics } from "../../types/topic";
import { SearchBar, Tag } from "antd-mobile";

import Loading from "../../components/loading";
import { TopicItem } from "../../components/topic-item";
import { MenuFoldOutlined } from "@ant-design/icons";
import { Avatar, Drawer } from "antd";
import { useMenuItem } from "./hooks/useMenuItem";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "../../api/user";
import { Users,ERole } from "../../types/user";

export default function Topic() {
  const [topicList, setTopicList] = useState<TopicData[]>([]);
  const [pagination, setPagination] = useState({ page: 1, size: 10 });
  const [content, setContent] = useState("");
  const { refreshAsync, loading } = useRequest(
    async () => {
      const res = await getTopicList({
        ...pagination,
        keyword: content,
      });
      setTopicList(res.data?.data ?? []);
    },
    {
      cacheKey: "topiclist" + content + pagination.page + pagination.size,
    }
  );
  const [topicDetail, setTopicDetail] = useState<Topics | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [userInfo, setUserInfo] = useState<Users>();
  const getUsers = useCallback(() => {
    getUserInfo().then(({ data, success }) => {
      if (success) {
        setUserInfo(data);
      }
    });
  }, []);
  useEffect(() => {
    getUsers();
  }, []);
  const menuItems = useMenuItem(getUsers, userInfo);
  const naviagte = useNavigate();
  return (
    <>
      <div className="bg-gray-100 p-2 flex gap-x-3">
        <MenuFoldOutlined
          className="text-gray-500"
          onClick={() => {
            setProfileOpen(true);
          }}
        />
        <SearchBar
          className="flex-1"
          onChange={(e) => {
            setContent(e);
          }}
          onBlur={() => {
            refreshAsync();
          }}
          placeholder="请输入内容"
          style={{ "--background": "#ffffff" }}
        />
      </div>
      {loading ? (
        <Loading></Loading>
      ) : (
        <div className="py-5">
          {topicList?.map((item) => {
            return (
              <div
                key={item?.topicsVO?.topics?.id}
                onClick={() => {
                  setTopicDetail(item?.topicsVO?.topics);
                }}
              >
                <TopicItem {...item?.topicsVO?.topics}></TopicItem>
              </div>
            );
          })}
        </div>
      )}
      <TopicDetail
        visible={Boolean(topicDetail)}
        onClose={() => setTopicDetail(null)}
        topics={topicDetail as Topics}
      ></TopicDetail>
      <Drawer
        title={
          <div className="flex flex-col ">
            <Avatar size="large" src={userInfo?.profile}></Avatar>
            <div className="flex gap-x-2 items-center">
              <div className="text-lg font-normal">{userInfo?.username}</div>
              {userInfo?.role === ERole.ADMIN && <Tag color="primary">管理员</Tag>}
            </div>
          </div>
        }
        placement="left"
        onClose={() => {
          setProfileOpen(false);
        }}
        closeIcon={false}
        width="50%"
        open={profileOpen}
        styles={{ content: { padding: 0 } }}
      >
        <div className="flex flex-col">
          {menuItems.map((item) => (
            <div
              className="flex gap-x-2 text-base p-1 rounded-md  my-2 active:bg-gray-200 "
              key={item.title}
              onClick={() => {
                if (item.path) {
                  naviagte(item.path);
                }
                if (item.onClick) {
                  item.onClick();
                }
              }}
            >
              {item.icon}
              <div className="text-gray-500">{item.title}</div>
            </div>
          ))}
        </div>
      </Drawer>
    </>
  );
}
