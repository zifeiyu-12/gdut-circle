import { TopicsVO } from "./topic";

/**
 * www.raven.sw.entity.vo.CirclesTopicsVO
 *
 * CirclesTopicsVO
 */
export interface CirclesTopicsVO {
  circles?: Circles;
  topicsVO?: TopicsVO;
  [property: string]: any;
}
/**
 * Circles
 */
export interface Circles {
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建者ID
   */
  createdBy?: number;
  /**
   * 圈描述
   */
  description?: string;
  id?: string;
  /**
   * 圈名称
   */
  name?: string;
  profile?: string;
}

export interface CirclesRequest {
  /**
   * 页码
   */
  page: number;
  /**
   * 页大小
   */
  size: number;
}

/**
 * circles bo
 *
 * CirclesBO
 */
export interface createCicleRequest {
  /**
   * 主题圈描述
   */
  circleDescription?: string;
  /**
   * 主题圈名称
   */
  circleName?: string;
  /**
   * 主题圈头像
   */
  circleProfile?: string;
}
