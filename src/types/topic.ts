import { Circles } from "./circle";
import { Comments } from "./comment";
import { PageQuery } from "./common";
import { UserInfo } from "./user";

export interface topicRequest extends PageQuery {
  /**
   * 标题关键字(模糊查询)
   */
  keyword?: string;
}

export interface CircleTopicRequest extends topicRequest {
  circleId: string;
}

/**
 * TopicsVO
 */
export interface TopicsVO {
  comments?: Comments[];
  topics?: Topics;
}

/**
 * Topics
 */
export interface Topics {
  /**
   * 圈ID，默认校园圈
   */
  circleId?: number;
  /**
   * 话题内容
   */
  content?: string;
  /**
   * 发布时间
   */
  createdAt?: string;
  id?: number;
  /**
   * 话题媒体数据
   */
  media?: string;
  /**
   * 审核状态
   */
  status?: { [key: string]: any };
  /**
   * 话题标题
   */
  title?: string;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 发布者ID
   */
  userId?: number;
  /**
   * 用户信息
   */
  userInfo?: UserInfo;
  [property: string]: any;
}

export interface TopicData {
  circles: Circles;
  topicsVO: TopicsVO;
}