import { FC, useEffect, useMemo, useRef, useState } from "react";
import { Dropdown, Tabs, TabsProps } from "antd";
import { DashOutlined, PlusOutlined } from "@ant-design/icons";
import { TopicDetail } from "../../components/topic-detail";
import {
  CircleModelType,
  addCircleList,
  setCircleList,
  setPagination,
  setTotal,
} from "../../store/slice/circle";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CirclePreview } from "../../components/circle-preview";
import { PullToRefresh } from "antd-mobile";
import { useRequest } from "ahooks";
import { getCircleList } from "../../api/circle";
import { getCircleTopicList } from "../../api/topic";
import Loading from "../../components/loading";
import { TopicItem } from "../../components/topic-item";
import { Topics } from "../../types/topic";
import { connect } from "react-redux";
import { Circles } from "../../types/circle";
import { useCircleList } from "../../hooks/useCircleLIst";
const MAX_TAB_COUNT = 3;
export interface CirclePorps {
  circleInfo: CircleModelType;
  setCircleList: (circle: Circles[]) => void;
  setPagination: (pagination: { page: number; size: number }) => void;
  setTotal: (total: number) => void;
}
const Circle: FC<CirclePorps> = ({
  circleInfo: { circleList, page, size },
  setCircleList,
  setPagination,
  setTotal,
}) => {
  const [, setSerachParams] = useSearchParams();
  const [activekey, setActivekey] = useState<string>();
  const { loading, runAsync: refreshCircleList } = useCircleList();
  useEffect(() => {
    if (circleList && circleList.length === 0) {
      refreshCircleList(page, size).then((res) => {
        if (res.success) {
          setActivekey(String(res.data?.data?.[0].id));
          setSerachParams({ circleId: res.data?.data?.[0].id + "" });
          setCircleList(res.data?.data ?? []);
          setTotal(res.data?.totalCount ?? 0);
          setPagination({ page: page + 1, size });
          return res.data?.data;
        }
      });
    }
  }, []);
  const items: TabsProps["items"] = useMemo(() => {
    if (!circleList) return [];
    const res: TabsProps["items"] = [
      ...circleList.slice(0, MAX_TAB_COUNT).map((item) => ({
        key: String(item.id ?? new Date().getTime()),
        label: (
          <div className="max-w-[90px] text-ellipsis overflow-hidden">
            {item.name ?? "匿名圈"}
          </div>
        ),
      })),
    ];
    if (circleList.length > MAX_TAB_COUNT) {
      res.push({
        key: "0",
        label: (
          <Dropdown
            menu={{
              items: circleList.slice(MAX_TAB_COUNT).map((item) => ({
                key: String(item.id ?? new Date().getTime()),
                label: item.name ?? "匿名圈",
              })),
              onClick: ({ key }) => {
                const index = circleList.findIndex(
                  (item) => String(item.id) === key
                );
                setCircleList([
                  circleList[index],
                  ...circleList.slice(0, index),
                  ...circleList.slice(index + 1),
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
  }, [circleList]);
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
      manual: true,
    }
  );
  useEffect(() => {
    runAsync();
  }, [activekey]);

  const navigate = useNavigate();
  const item = useMemo(() => {
    return circleList?.find((item) => item.id == activekey);
  }, [circleList, activekey]);
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
                  if (Number(key) !== 0) setActivekey(key);
                  setSerachParams({
                    circleId: key,
                  });
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

export default connect(
  (state: { circle: CircleModelType }) => ({
    circleInfo: state.circle,
  }),
  {
    setCircleList,
    setPagination,
    setTotal,
    addCircleList,
  }
)(Circle);
