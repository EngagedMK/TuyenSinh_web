export interface ITokenEntity {
  refreshToken: string;
  accessToken: string;
}

export interface ITokenExtendEntity extends ITokenEntity {
  roles: string;
}
