import { ImageUploadItem } from "antd-mobile";
import { uploadFile } from "../api/common";

export const handleUpload = async (file: File): Promise<ImageUploadItem> => {
  const data = await uploadFile(file);
  return {
    key: file.name + new Date().getTime(),
    url: data as string,
  };
};
