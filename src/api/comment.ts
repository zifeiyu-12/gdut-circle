import { CommentInfo, Comments, CommentsRequest } from "../types/comment";
import http from "../utils/request";

export const getCommentList = async (params: CommentsRequest) => {
  return await http.get<Comments[]>("/comment/get", params);
};

export const CreateComment = async (data: CommentInfo) => {
  return await http.post("/comment/add", data);
};
