export interface ISignInInput {
  email: string;
  password: string;
}

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface IAuthSlice {
  user: IUser | null;
  loading: boolean;
  isAuthenticated: boolean;
}
