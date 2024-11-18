import { Button } from "antd";
import { FC, useState } from "react";

import { TopicType } from "../../store/slice/topic";
import { Divider, Popup, Input, ImageUploader, Empty } from "antd-mobile";
import { FileImageOutlined } from "@ant-design/icons";
import { TopicItem } from "../topic-item";
import { TopicsVO } from "../../types/topic";
export const TopicDetail: FC<TopicsVO> = (topic) => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [commentList, SetCommentList] = useState<TopicType[]>([
    {
      content: "评论内容",
      id: "12",
      createTime: new Date().getTime(),
    },
  ]);
  const [inputVisible, setInputVisible] = useState(false);
  const [content, setContent] = useState("");
  const [uploadVisible, setUploadVisible] = useState(false);
  const [fileList, setFileList] = useState<any[]>([]);
  const sendComment = () => {
    if (!content) return;
    SetCommentList([
      {
        id: new Date().getTime().toString(),
        content,
        createTime: new Date().getTime(),
        imageList: fileList,
      },
      ...commentList,
    ]);
    setContent("");
    setFileList([]);
    setUploadVisible(false);
  };
  const handleClose = () => {
    setPopupVisible(false);
    setInputVisible(false);
  };

  return (
    <>
      <div
        onClick={() => {
          setPopupVisible(true);
        }}
      >
        <TopicItem {...topic}></TopicItem>
      </div>
      <Popup
        visible={popupVisible}
        onMaskClick={handleClose}
        onClose={handleClose}
        bodyStyle={{ height: "80vh" }}
        className="overflow-y-scroll"
      >
        <div className="h-full overflow-y-scroll">
          <div
            onClick={() => {
              setInputVisible(true);
            }}
          >
            <TopicItem {...topic}></TopicItem>
          </div>

          <Divider>讨论区</Divider>
          <div className="gap-y-2 flex flex-col">
            {commentList.map((item) => {
              return <TopicItem {...item} key={item.id}></TopicItem>;
            })}
            <div className="h-10"></div>
            {!commentList.length && <Empty description="暂无评论"></Empty>}
          </div>
        </div>
      </Popup>
      {inputVisible && (
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
