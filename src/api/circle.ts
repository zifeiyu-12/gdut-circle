import { Circles, CirclesRequest } from "../types/circle";
import { PageVO } from "../types/common";
import http from "../utils/request";

export const getCircleList = async (params: CirclesRequest) => {
  return await http.get<PageVO<Circles>>("/circle/get", params);
};
