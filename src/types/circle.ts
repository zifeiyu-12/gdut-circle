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
