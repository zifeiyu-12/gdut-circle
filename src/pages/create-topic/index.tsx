import { Button, Input, message } from "antd";
import { ImageUploadItem, ImageUploader, NavBar, Picker } from "antd-mobile";
import { useNavigate, useSearchParams } from "react-router-dom";
import type { GetProp, UploadProps } from "antd";
import { FC, useEffect, useMemo, useState } from "react";

import { TopicType } from "../../store/slice/topic";
import "./index.css";
import {
  CircleModelType,
  addCircleList,
  setCircleList,
  setPagination,
  setTotal,
} from "../../store/slice/circle";
import { handleUpload } from "../../utils/handleUpload";
import { connect } from "react-redux";
import { Circles } from "../../types/circle";
import { useRequest } from "ahooks";
import { getCircleList } from "../../api/circle";
import { useCircleList } from "../../hooks/useCircleLIst";
import { createTopic } from "../../api/topic";
import { CirclePreview } from "../../components/circle-preview";
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
export interface CreateTopicPorps {
  circleInfo: CircleModelType;
  setCircleList: (circle: Circles[]) => void;
  setPagination: (pagination: { page: number; size: number }) => void;
  setTotal: (total: number) => void;
}
const CreateTopic: FC<CreateTopicPorps> = ({
  setCircleList,
  setPagination,
  setTotal,
  circleInfo,
}) => {
  const { circleList, page, size } = circleInfo;
  const navigate = useNavigate();
  const [content, setContent] = useState<string>("");

  const [fileList, setFileList] = useState<ImageUploadItem[]>([]);

  const { runAsync: refreshCircleList, loading } = useCircleList();
  const [searchParams] = useSearchParams();
  useEffect(() => {
    if (circleList && circleList.length === 0) {
      refreshCircleList(page, size).then((res) => {
        if (res.success) {
          setCircleList(res.data?.data ?? []);
          setTotal(res.data?.totalCount ?? 0);
          setPagination({ page: page + 1, size });
          return res.data?.data;
        }
      });
    }
  }, []);
  const [visible, setVisible] = useState(false);
  const [circleId, setCirCleId] = useState(searchParams.get("circleId"));
  const item = useMemo(() => {
    if (!circleId) return null;
    return circleList.find((item) => Number(item.id) === Number(circleId));
  }, [circleId, circleList]);
  const submit = async () => {
    const { success, message: mes } = await createTopic({
      content,
      circleId: +(circleId ?? "0"),
      title: "",
      media: fileList.map((item) => item.url).join(","),
    });
    if (success) {
      message.success(mes);
      navigate(-1);
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
        <div
          onClick={() => {
            setVisible(true);
          }}
        >
          {item && <CirclePreview {...item}></CirclePreview>}
        </div>
        <Picker
          columns={[
            circleList.map((item) => ({
              value: item.id ?? "0",
              label: item.name ?? "匿名圈",
              key: item.id ?? "0",
            })),
          ]}
          visible={visible}
          onClose={() => {
            setVisible(false);
          }}
          value={[item?.id ?? "0"]}
          onConfirm={(v) => {
            setCirCleId(v[0] as string);
          }}
        />
        <Input.TextArea
          className=" !min-h-20 border-0 mb-4 mt-4"
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
          upload={handleUpload}
        />
      </div>
    </div>
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
)(CreateTopic);
