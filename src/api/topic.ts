import { PageVO } from "../types/common";
import {
  CircleTopicRequest,
  TopicData,
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
