import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IAuthSlice, IUser } from '@interfaces/auth.interface';
import { PURGE } from 'redux-persist';

const initialState: IAuthSlice = {
  user: null,
  loading: false,
  isAuthenticated: false,
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
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState); // Handle PURGE action
  },
});

export const { loginStatus, loginSuccess } = authSlice.actions;
export default authSlice.reducer;
