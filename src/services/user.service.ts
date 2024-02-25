import { USER } from '../api/apiEndPoints';
import instance from '../api';
import { ISignUpInput } from '../types/user.interface';

export const createUser = (userData: ISignUpInput) => {
  return instance.post(USER.CREATE_USER, userData);
};
