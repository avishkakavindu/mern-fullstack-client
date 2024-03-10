import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IAuthSlice, IUser } from '@interfaces/auth.interface';

const initialState: IAuthSlice = {
  user: null,
  loading: false,
  error: false,
};

// A slice for authentication
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /**
     * Action creator to indicate the start of the login process.
     * Sets the loading state to true.
     * @param state - Current state of the authentication slice.
     */
    loginStatus(state, action: PayloadAction<{ loading: boolean }>) {
      const { loading } = action.payload;
      state.loading = loading;
    },
    /**
     * Action creator to indicate a successful login.
     * Sets the loading state to false and updates the user object.
     * @param state - Current state of the authentication slice.
     * @param action - Payload containing the user data.
     */
    loginSuccess(state, action: PayloadAction<IUser>) {
      state.loading = false;
      state.user = action.payload;
    },
    loginFailure(state, payload) {},
  },
});

export const { loginStatus, loginSuccess } = authSlice.actions;
export default authSlice.reducer;
