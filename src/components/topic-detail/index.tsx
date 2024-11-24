import { Button } from "antd";
import { FC, useEffect, useState } from "react";

import topic, { TopicType } from "../../store/slice/topic";
import { Divider, Popup, Input, ImageUploader, Empty } from "antd-mobile";
import { FileImageOutlined } from "@ant-design/icons";
import { TopicItem } from "../topic-item";
import { TopicsVO } from "../../types/topic";
import { useRequest } from "ahooks";
import { CreateComment, getCommentList } from "../../api/comment";
import Loading from "../loading";
export interface TopicDetailProps extends TopicsVO {
  visible: boolean;
  onClose: () => void;
}
export const TopicDetail: FC<TopicDetailProps> = ({
  topics,
  visible,
  onClose,
}) => {
  const {
    data: commentList,
    loading,
    refreshAsync,
  } = useRequest(
    async () => {
      const id = topics?.id;
      if (!id) return [];
      const res = await getCommentList({ topicId: id });
      if (res.success) {
        return res.data;
      }
      return [];
    },
    {
      cacheKey: "commentList" + topics?.id,
    }
  );
  useEffect(() => {
    refreshAsync();
  }, [topics?.id]);

  const [content, setContent] = useState("");
  const [uploadVisible, setUploadVisible] = useState(false);
  const [fileList, setFileList] = useState<any[]>([]);
  const sendComment = async () => {
    if (!content) return;
    if (!topics?.id) return;
    const res = await CreateComment({
      content,
      topicId: topics?.id,
    });
    if (res.success) {
      setContent("");
      setFileList([]);
      setUploadVisible(false);
      refreshAsync();
    }
  };
  return (
    <>
      <Popup
        visible={visible}
        onMaskClick={onClose}
        onClose={onClose}
        bodyStyle={{ height: "80vh" }}
        className="overflow-y-scroll"
      >
        <div className="h-full overflow-y-scroll">
          <TopicItem {...topics}></TopicItem>

          <Divider>讨论区</Divider>
          {loading ? (
            <Loading></Loading>
          ) : (
            <div className="gap-y-2 flex flex-col">
              {commentList?.map((item) => {
                return <TopicItem {...item} key={item.id}></TopicItem>;
              })}
              <div className="h-10"></div>
              {!commentList?.length && <Empty description="暂无评论"></Empty>}
            </div>
          )}
        </div>
      </Popup>
      {visible && (
        <div className=" fixed bottom-0 z-[1002] bg-gray-100 w-screen  py-1 px-3 flex flex-col gap-y-2">
          <div className="flex gap-x-4">
            <Input
              value={content}
              className="bg-white rounded-md"
              autoFocus
              onChange={setContent}
            ></Input>
            <div className="flex gap-x-1">
              <Button onClick={sendComment}>发送</Button>
              <Button
                icon={<FileImageOutlined></FileImageOutlined>}
                onClick={() => {
                  setUploadVisible(!uploadVisible);
                }}
              ></Button>
            </div>
          </div>
          {uploadVisible && (
            <ImageUploader
              value={fileList}
              onChange={setFileList}
              multiple
              style={{ "--cell-size": "100px" }}
              maxCount={9}
              upload={async (file) => {
                const fileReder = new FileReader();
                fileReder.readAsDataURL(file);
                const url: string = await new Promise((resovle) => {
                  fileReder.onload = () => {
                    resovle(fileReder.result as string);
                  };
                });
                return {
                  key: file.name + new Date().getTime(),
                  url,
                };
              }}
            />
          )}
        </div>
      )}
    </>
  );
};
