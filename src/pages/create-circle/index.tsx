import { Button, Input, Upload, Image, Divider } from "antd";
import { ImageUploadItem, ImageUploader, NavBar } from "antd-mobile";
import { useNavigate } from "react-router-dom";
import type { GetProp, UploadFile, UploadProps } from "antd";
import { useEffect, useMemo, useRef, useState } from "react";
import { CirclePreview } from "../../components/circle-preview";
import { CircleType } from "../../store/slice/circle";
import { handleUpload } from "../../utils/handleUpload";
import { createCicle } from "../../api/circle";
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

export default function CreateTopic() {
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const [fileList, setFileList] = useState<ImageUploadItem[]>([]);

  const circlePreview = useMemo(() => {
    if (fileList && fileList.length > 0) return fileList[0].url;
  }, [fileList]);

  const submit = async () => {
    const { success } = await createCicle({
      circleName: title,
      circleDescription: content,
      circleProfile: circlePreview,
    });
    if (success) {
      navigate(-1);
    }
  };

  return (
    <div>
      <NavBar
        onBack={() => navigate(-1)}
        right={
          <Button type="primary" onClick={submit}>
            创建
          </Button>
        }
      ></NavBar>
      <div className="p-5 px-6">
        <Input
          className=" border-0 mb-4"
          value={title}
          onChange={(e) => {
            setTitle(e.currentTarget.value);
          }}
          placeholder="请输入主题"
        ></Input>
        <Input.TextArea
          className=" !min-h-20 border-0 mb-4"
          value={content}
          onChange={(e) => {
            setContent(e.currentTarget.value);
          }}
          autoSize
          placeholder="请输入简介"
        ></Input.TextArea>

        <ImageUploader
          value={fileList}
          onChange={setFileList}
          style={{ "--cell-size": "100px" }}
          upload={handleUpload}
          maxCount={1}
        />

        <Divider plain>
          <span className="text-gray-400">预览效果</span>
        </Divider>
        <CirclePreview
          name={title}
          profile={circlePreview}
          description={content}
          id={new Date().getTime().toString()}
        ></CirclePreview>
      </div>
    </div>
  );
}
