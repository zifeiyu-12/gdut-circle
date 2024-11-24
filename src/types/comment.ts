import { UserInfo } from "./user";

/**
 * 评论表(Comments)表实体类
 *
 * Comments
 */
export interface Comments {
  /**
   * 评论内容
   */
  content?: string;
  /**
   * 评论时间
   */
  createdAt?: string;
  id?: number;
  /**
   * 话题ID
   */
  topicId?: number;
  /**
   * 评论者ID
   */
  userId?: number;
  /**
   * 用户信息
   */
  userInfo?: UserInfo;
  [property: string]: any;
}

export interface CommentsRequest {
  topicId: number;
}
/**
 * 创建评论实体类
 *
 * Comments
 */
export interface CommentInfo {
  content: string;
  topicId: number;
}
