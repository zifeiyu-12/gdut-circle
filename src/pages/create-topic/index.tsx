import { Button, Input, message } from "antd";
import { ImageUploadItem, ImageUploader, NavBar } from "antd-mobile";
import { useNavigate } from "react-router-dom";
import type { GetProp, UploadProps } from "antd";
import { useState } from "react";

import { TopicType } from "../../store/slice/topic";
import "./index.css";
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

export default function CreateTopic() {
  const navigate = useNavigate();
  const [content, setContent] = useState<string>("");

  const [fileList, setFileList] = useState<ImageUploadItem[]>([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
  ]);

  const submit = async () => {
    try {
      const topiclist: TopicType[] = JSON.parse(
        localStorage.getItem("topicList") || "[]"
      );
      localStorage.setItem(
        "topicList",
        JSON.stringify([
          {
            id: new Date().getTime().toString(),
            content,
            imageList: await Promise.all(
              fileList.map(async (item) => {
                if (!item.url) {
                  item.url = await new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(item.originFileObj as FileType);
                    reader.onload = () => resolve(reader.result as string);
                  });
                }
                return item;
              })
            ),
            createTime: new Date().getTime(),
          },
          ...topiclist,
        ])
      );
      navigate(-1);
    } catch (e) {
      message.error("发布失败" + e);
    }
  };

  return (
    <div>
      <NavBar
        onBack={() => navigate(-1)}
        right={
          <Button type="primary" onClick={submit}>
            发表
          </Button>
        }
      ></NavBar>
      <div className="p-5 px-6">
        <Input.TextArea
          className=" !min-h-20 border-0 mb-4"
          autoSize
          value={content}
          onChange={(e) => {
            setContent(e.currentTarget.value);
          }}
          placeholder="请输入~~"
        ></Input.TextArea>
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
      </div>
    </div>
  );
}
