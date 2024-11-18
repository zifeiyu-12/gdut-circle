import { useEffect, useState } from "react";
import { TopicType } from "../../store/slice/topic";
import { TopicDetail } from "../../components/topic-detail";
import { getTopicList } from "../../api/topic";
import { useRequest } from "ahooks";
import { TopicData } from "../../types/topic";
import { SearchBar } from "antd-mobile";
import { LoadingOutlined } from "@ant-design/icons";
import Loading from "../../components/loading";

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
              <TopicDetail
                key={item?.topicsVO?.topics?.id}
                {...item?.topicsVO}
              ></TopicDetail>
            );
          })}
        </div>
      )}
    </>
  );
}
