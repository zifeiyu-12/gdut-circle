import { useEffect, useState } from "react";
import { TopicType } from "../../store/slice/topic";
import { TopicDetail } from "../../components/topic-detail";
import { getTopicList } from "../../api/topic";
import { useRequest } from "ahooks";
import { TopicData, Topics } from "../../types/topic";
import { SearchBar } from "antd-mobile";
import { LoadingOutlined } from "@ant-design/icons";
import Loading from "../../components/loading";
import { TopicItem } from "../../components/topic-item";

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
  const [topicDetail, setTopicDetail] = useState<Topics | null>();
  return (
    <>
      <div className="bg-gray-100 p-2">
        <SearchBar
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
    </>
  );
}
