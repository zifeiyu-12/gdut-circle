import { Circles, CirclesRequest, createCicleRequest } from "../types/circle";
import { PageVO } from "../types/common";
import http from "../utils/request";

export const getCircleList = async (params: CirclesRequest) => {
  return await http.get<PageVO<Circles>>("/circle/get", params);
};

export const createCicle = async (data: createCicleRequest) => {
  return await http.post("/circle/add", data);
};
