import { AUTH } from '../api/apiEndPoints';
import instance from '../api';
import { ISignInInput } from '../types/auth.interface';

export const login = (signInData: ISignInInput) => {
  return instance.post(AUTH.LOGIN, signInData);
};
