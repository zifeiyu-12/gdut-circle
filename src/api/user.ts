import { RegisteInfo, TokenVO, loginInfo } from "../types/user";
import http from "../utils/request";
export const login = async (data: loginInfo) => {
  return await http.post<TokenVO>("/user/login", data);
};

export const registe = async (data: RegisteInfo) => {
  return await http.post<TokenVO>("/user/register", data);
};
