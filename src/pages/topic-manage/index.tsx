import { Button, NavBar, SwipeAction } from "antd-mobile";
import { useNavigate } from "react-router-dom";
import { usePagination } from "ahooks";
import { getNeedReviewTopicList, passTopic } from "../../api/topic";
import Loading from "../../components/loading";
import { Empty } from "antd";
import { TopicItem } from "../../components/topic-item";
import { EStaus } from "../../types/topic";

export const TopicManage = () => {
  const navigate = useNavigate();
  const {
    data,
    loading,
    pagination: { changeCurrent },
  } = usePagination(async ({ current, pageSize }) => {
    const { success, data } = await getNeedReviewTopicList({
      page: current,
      size: pageSize,
    });
    if (success) {
      return {
        total: data?.totalCount ?? 0,
        list: data?.data ?? [],
      };
    }
    return {
      total: 0,
      list: [],
    };
  });
  const handlePass = async (status: EStaus, topicId: number) => {
    const { success } = await passTopic({
      topicId,
      status,
    });
    if (success) {
      changeCurrent(0);
    }
  };
  return (
    <>
      <NavBar onBack={() => navigate(-1)}></NavBar>
      {loading ? (
        <Loading></Loading>
      ) : !data?.list || !data?.list.length ? (
        <Empty description="没有需要审核的话题"></Empty>
      ) : (
        data.list.map((topic) => {
          return (
            <SwipeAction
              key={topic.id}
              rightActions={[
                {
                  text: "通过",
                  key: EStaus.pass,
                  color: "success",
                },
                {
                  text: "不通过",
                  key: EStaus.fail,
                  color: "danger",
                },
              ].map((item) => ({
                ...item,
                onClick(e) {
                  handlePass(item.key, topic.id ?? 0);
                },
              }))}
            >
              <TopicItem {...topic} key={topic.id}></TopicItem>;
            </SwipeAction>
          );
        })
      )}
    </>
  );
};
