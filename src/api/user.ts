import { RegisteInfo, TokenVO, Users, loginInfo } from "../types/user";
import http from "../utils/request";
export const login = async (data: loginInfo) => {
  return await http.post<TokenVO>("/user/login", data);
};

export const registe = async (data: RegisteInfo) => {
  return await http.post<TokenVO>("/user/register", data);
};

export const upgrade = async () => {
  return await http.post("/user/upgrade");
};

export const getUserInfo = async () => {
  return await http.get<Users>("/user/self");
};

export const createChat = async (toUserId: string) => {
  return await http.post("/chat/start?toUserId=" + toUserId);
};
