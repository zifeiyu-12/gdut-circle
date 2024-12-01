import { Avatar, Image } from "antd";
import { FC, useRef, useState } from "react";
import dayjs from "dayjs";
import { ImageViewer, MultiImageViewerRef } from "antd-mobile";
import { Topics } from "../../types/topic";
import { useNavigate } from "react-router-dom";
export const TopicItem: FC<Topics> = (topic) => {
  const [visible, setVisible] = useState(false);
  const previewRef = useRef<MultiImageViewerRef>(null);
  const navigate = useNavigate();
  return (
    <div className={`py-3 gap-y-2 flex flex-col topic-card px-4`}>
      <div className="flex justify-between ">
        <div className="flex gap-x-2">
          <Avatar
            src={topic?.userInfo?.profile ?? ""}
            onClick={(e) => {
              e?.stopPropagation();
              navigate("/chat?toUserId=" + topic.userInfo?.id);
            }}
          ></Avatar>
          <div>
            <div className="text-sm font-medium">
              {topic?.userInfo?.username ?? "匿名"}
            </div>
            <div className="text-gray-400">
              {dayjs(topic?.updatedAt).format("YYYY-MM-DD HH:mm:ss")}
            </div>
          </div>
        </div>
      </div>
      <div className="text-sm">{topic?.content}</div>
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
