/**
 * ResultPageVOCirclesTopicsVO
 */
export interface Response<T> {
  /**
   * SUCCESS_CODE = 200; FAIL_CODE = 400;
   */
  code?: number;
  /**
   * 数据
   */
  data?: T;
  /**
   * 是否成功
   */
  success?: boolean;
  /**
   * 信息
   */
  message?: string;
}


/**
 * 数据
 *
 * PageVOCirclesTopicsVO
 */
export interface PageVO<T> {
  /**
   * 当前页码
   */
  currentPage?: number;
  /**
   * 当前页数据列表
   */
  data?: T[];
  /**
   * 每页条数
   */
  pageSize?: number;
  /**
   * 总条数
   */
  totalCount?: number;
  /**
   * 总页数
   */
  totalPages?: number;
}

export interface PageQuery {
  page:number
  size:number
}
