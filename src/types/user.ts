/**
 * 用户信息
 *
 * UserInfo
 */
export interface UserInfo {
  id?: number;
  profile?: string;
  username?: string;
}

/**
 * 登录信息
 *
 * login
 */
export interface loginInfo {
  username?: string;
  password?: string;
}
/**
 * register bo
 *
 * RegisterBO
 */
export interface RegisteInfo {
  /**
   * 邮箱
   */
  email?: string;
  /**
   * 密码
   */
  password?: string;
  /**
   * 头像
   */
  profile?: string;
  /**
   * 用户名
   */
  username?: string;
}

/**
 * 数据
 *
 * TokenVO
 */
export interface TokenVO {
  /**
   * 权限token
   */
  accessToken?: string;
  /**
   * 刷新token
   */
  refreshToken?: string;
  /**
   * 用户id
   */
  userId?: number;
  [property: string]: any;
}
export enum ERole {
  ADMIN = "ADMIN",
  USER = "user",
}
/**
 * 数据
 *
 * Users
 */
export interface Users {
  /**
   * 注册时间
   */
  createdAt?: string;
  /**
   * 邮箱
   */
  email?: string;
  id?: number;
  /**
   * 密码
   */
  password?: string;
  /**
   * 头像
   */
  profile?: string;
  /**
   * 用户角色
   */
  role?: ERole;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 用户名
   */
  username?: string;
}
