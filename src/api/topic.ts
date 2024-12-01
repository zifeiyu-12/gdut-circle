import { PageQuery, PageVO } from "../types/common";
import {
  CircleTopicRequest,
  CreateTopicRequest,
  PassTopicRequest,
  TopicData,
  Topics,
  TopicsVO,
  topicRequest,
} from "../types/topic";
import http from "../utils/request";

export const getTopicList = async (params: topicRequest) => {
  return await http.get<PageVO<TopicData>>("/topic/getForMainPage", params);
};

export const getCircleTopicList = async (params: CircleTopicRequest) => {
  return await http.get<PageVO<TopicsVO>>("/topic/getToShowPage", params);
};

export const createTopic = async (data: CreateTopicRequest) => {
  return await http.post<CreateTopicRequest>("/topic/add", data);
};

export const getNeedReviewTopicList = async (pagination: PageQuery) => {
  return await http.get<PageVO<Topics>>("/topic/getNeedReview", pagination);
};

export const passTopic = async (data: PassTopicRequest) => {
  return await http.post("/topic/review", data);
};
