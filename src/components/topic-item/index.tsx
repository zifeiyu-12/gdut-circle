import { Avatar, Image } from "antd";
import { FC, useRef, useState } from "react";
import dayjs from "dayjs";
import { ImageViewer, MultiImageViewerRef } from "antd-mobile";
import { TopicsVO } from "../../types/topic";
export const TopicItem: FC<TopicsVO> = (topic) => {
  const [visible, setVisible] = useState(false);
  const previewRef = useRef<MultiImageViewerRef>(null);
  return (
    <div className={`py-3 gap-y-2 flex flex-col topic-card px-4`}>
      <div className="flex justify-between ">
        <div className="flex gap-x-2">
          <Avatar src={topic.topics?.userInfo?.profile ?? ""}></Avatar>
          <div>
            <div className="text-sm font-medium">
              {topic?.topics?.userInfo?.username ?? "匿名"}
            </div>
            <div className="text-gray-400">
              {dayjs(topic?.topics?.updatedAt).format("YYYY-MM-DD HH:mm:ss")}
            </div>
          </div>
        </div>
      </div>
      <div className="text-sm">{topic?.topics?.content}</div>
      <div className="leading-5 tracking-wide ">
        {[].map((src: string, index: number) => {
          return (
            <Image
              rootClassName="mx-1"
              wrapperClassName="rounded-md"
              src={src}
              key={index}
              width={100}
              height={100}
              preview={false}
              onClick={(e) => {
                e.stopPropagation();
                setVisible(true);
                if (previewRef) {
                  previewRef.current?.swipeTo(index);
                }
              }}
              className=" object-contain"
            ></Image>
          );
        })}
        <ImageViewer.Multi
          ref={previewRef}
          images={[].map((src: string) => src ?? "")}
          visible={visible}
          defaultIndex={0}
          onClose={() => {
            setVisible(false);
          }}
        />
      </div>
    </div>
  );
};
