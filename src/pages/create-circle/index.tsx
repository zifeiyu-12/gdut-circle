import { Button, Input, Upload, Image, Divider } from "antd";
import { NavBar } from "antd-mobile";
import { useNavigate } from "react-router-dom";
import type { GetProp, UploadFile, UploadProps } from "antd";
import { useEffect, useMemo, useRef, useState } from "react";
import { PauseOutlined, PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import { ReactMic, ReactMicStopEvent } from "react-mic";
import lottie, { AnimationItem } from "lottie-web";
import ImgCrop from "antd-img-crop";
import { CirclePreview } from "../../components/circle-preview";
import { CircleType } from "../../store/slice/circle";
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

export default function CreateTopic() {
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const animationContainer = useRef<HTMLDivElement>(null);
  const [animation, setAnimation] = useState<AnimationItem>();
  useEffect(() => {
    setAnimation(
      lottie.loadAnimation({
        container: animationContainer.current as HTMLDivElement,
        path: "/src/assets/loading.json",
        renderer: "svg",
        loop: true,
        autoplay: false,
      })
    );

    return () => {
      animation?.destroy();
    };
  }, []);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
  ]);

  // 文件本地处理
  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  // 文件预览
  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as FileType);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    setPreviewImage(src);
    setPreviewOpen(true);
  };
  const [circlePreviewUrl, setCirclePreviewUrl] = useState<string>();
  useEffect(() => {
    const [file] = fileList;
    if (!file) {
      setCirclePreviewUrl("");
      return;
    }
    let src = file.url as string;
    if (!src) {
      new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as FileType);
        reader.onload = () => resolve(reader.result as string);
      }).then((src) => {
        setCirclePreviewUrl(src as string);
      });
      return;
    }
    setCirclePreviewUrl(src);
  }, [fileList]);

  const submit = async () => {
    const circleList: CircleType[] = JSON.parse(
      localStorage.getItem("circleList") || "[]"
    );
    localStorage.setItem(
      "circleList",
      JSON.stringify([
        {
          id: new Date().getTime().toString(),
          description: content,
          name: title,
          cover: circlePreviewUrl,
          createTime: new Date().getTime(),
        },
        ...circleList,
      ])
    );
    navigate(-1);
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

        <Upload
          listType="picture-card"
          fileList={fileList}
          onChange={onChange}
          onPreview={onPreview}
          maxCount={1}
          beforeUpload={() => false}
        >
          {fileList.length < 1 && (
            <button style={{ border: 0, background: "none" }} type="button">
              <PlusOutlined />
            </button>
          )}
        </Upload>

        <Divider plain>
          <span className="text-gray-400">预览效果</span>
        </Divider>
        <CirclePreview
          name={title}
          cover={circlePreviewUrl}
          description={content}
          id={new Date().getTime().toString()}
        ></CirclePreview>
      </div>
      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: setPreviewOpen,
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </div>
  );
}
