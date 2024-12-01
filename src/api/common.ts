import http from "../utils/request";

export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  return await http.post("/files/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
