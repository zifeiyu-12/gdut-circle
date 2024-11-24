import { connect } from "react-redux";
import { CircleType, refreshCircleList } from "../../store/slice/circle";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import { Divider, Dropdown, Empty, Tabs, TabsProps } from "antd";
import { DashOutlined, LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import topic, { TopicType } from "../../store/slice/topic";
import { TopicDetail } from "../../components/topic-detail";
import { setCircleList } from "../../store/slice/circle";
import { useNavigate } from "react-router-dom";
import { CirclePreview } from "../../components/circle-preview";
import { PullToRefresh } from "antd-mobile";
import { useRequest } from "ahooks";
import { getCircleList } from "../../api/circle";
import { getCircleTopicList } from "../../api/topic";
import Loading from "../../components/loading";
import { TopicItem } from "../../components/topic-item";
import { Topics } from "../../types/topic";

export interface CirclePorps {}
const Circle: FC<CirclePorps> = () => {
  const [pagination, setPagination] = useState({ page: 1, size: 10 });
  const [activekey, setActivekey] = useState<string>();
  const { data, loading } = useRequest(
    async () => {
      const res = await getCircleList(pagination);
      if (res.success) {
        setActivekey(String(res.data?.data?.[0].id));
        return res.data?.data;
      }
    },
    {
      cacheKey: "circleList" + pagination.page + pagination.size,
    }
  );
  const items: TabsProps["items"] = useMemo(() => {
    if (!data) return [];
    const res: TabsProps["items"] = [
      ...data.slice(0, 4).map((item) => ({
        key: String(item.id ?? new Date().getTime()),
        label: item.name ?? "匿名圈",
      })),
    ];
    if (data.length > 4) {
      res.push({
        key: "0",
        label: (
          <Dropdown
            menu={{
              items: data.slice(4).map((item) => ({
                key: String(item.id ?? new Date().getTime()),
                label: item.name ?? "匿名圈",
              })),
              onClick: ({ key }) => {
                const index = data.findIndex((item) => String(item.id) === key);
                setCircleList([
                  data[index],
                  ...data.slice(0, index),
                  ...data.slice(index + 1),
                ]);
                setActivekey(key);
              },
            }}
          >
            <DashOutlined />
          </Dropdown>
        ),
      });
    }
    return res;
  }, [data]);
  const [topicPagination, setTopicPagination] = useState({ page: 1, size: 10 });
  const {
    data: topicData,
    loading: topicLoading,
    runAsync,
  } = useRequest(
    async () => {
      if (!activekey) {
        return [];
      }
      const res = await getCircleTopicList({
        ...topicPagination,
        circleId: activekey,
      });
      if (res.success) {
        return res.data?.data;
      }
    },
    {
      cacheKey: "circleTopicList" + topicPagination.page + topicPagination.size,
      manual: true,
    }
  );
  useEffect(() => {
    runAsync();
  }, [activekey]);

  const navigate = useNavigate();
  const item = useMemo(() => {
    return data?.find((item) => item.id === activekey);
  }, [data, activekey]);
  const [start, setStart] = useState<number>(0);
  const hiddenRef = useRef<(value: boolean) => void>();
  const [topicDetail, setTopicDetail] = useState<Topics | null>();
  return (
    <>
      {loading || topicLoading ? (
        <Loading></Loading>
      ) : (
        <PullToRefresh
          renderText={() => <CirclePreview {...item}></CirclePreview>}
          completeDelay={100}
          headHeight={160}
          onRefresh={async () => {
            await new Promise((resolve) => {
              hiddenRef.current = resolve;
            });
          }}
        >
          <div
            className="h-screen flex flex-col"
            onTouchStart={(e) => {
              setStart(e.touches[0].clientY);
            }}
            onTouchEnd={(e) => {
              if (e.changedTouches[0].clientY - start < 0) {
                if (hiddenRef.current) {
                  hiddenRef.current?.(true);
                }
              }
            }}
          >
            <div className="flex w-screen px-5 ">
              <Tabs
                className="flex-1"
                activeKey={activekey}
                tabBarGutter={20}
                items={items}
                onChange={(key) => {
                  setActivekey(key);
                }}
              ></Tabs>
              <PlusOutlined
                onClick={() => {
                  navigate("/create-circle");
                }}
                className="mb-4"
              ></PlusOutlined>
            </div>
            <>
              {topicData?.map((item) => {
                return (
                  <div
                    key={item?.topics?.id}
                    onClick={() => {
                      setTopicDetail(item?.topics);
                    }}
                  >
                    <TopicItem {...item?.topics}></TopicItem>
                  </div>
                );
              })}
            </>
            <TopicDetail
              visible={Boolean(topicDetail)}
              onClose={() => setTopicDetail(null)}
              topics={topicDetail as Topics}
            ></TopicDetail>
          </div>
        </PullToRefresh>
      )}
    </>
  );
};

export default Circle;
