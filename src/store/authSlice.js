import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from "../apis/firebase";

export const signInWithGoogleThunk = createAsyncThunk(
  "session/signInWithGoogle",
  async () => {
    const response = await api.signInWithGoogle();
    const { user, providerId } = response;
    const { displayName, email, photoURL, uid } = user;
    return { user: { displayName, email, photoURL, uid }, providerId };
  }
);

export const createUserWithEmailAndPassword = createAsyncThunk(
  "session/createUserWithEmailAndPassword",
  async (payload, { rejectWithValue }) => {
    if (!payload?.email || !payload?.password) return;
    try {
      const response = await api.register(payload.email, payload.password);
      const { user, providerId } = response;
      const { displayName, email, photoURL, uid } = user;
      return { user: { displayName, email, photoURL, uid }, providerId };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const signInWithEmailAndPassword = createAsyncThunk(
  "session/signInWithEmailAndPassword",
  async (payload, { dispatch, rejectWithValue }) => {
    if (!payload?.email || !payload?.password) return;
    try {
      const response = await api.login(payload.email, payload.password)
      const { user, providerId } = response;
      console.log({ user });
      const { displayName, email, photoURL, uid } = user;

      return { user: { displayName, email, photoURL, uid }, providerId };
    } catch (error) {
      console.log({ error })
      const { code } = error;
      switch (code) {
        case "auth/user-not-found":
          try {
            await dispatch(createUserWithEmailAndPassword(payload));
            const response = await api.login(payload.email, payload.password);
            const { user, providerId } = response;
            const { displayName, email, photoURL, uid } = user;
            if (!user) {
              throw new Error("User not found"); // Throw an error to be caught by the outer catch block
            }
            return { user: { displayName, email, photoURL, uid }, providerId };
          } catch (e) {
            console.log({ e });
            return rejectWithValue(e);
          }
        case "auth/wrong-password": {
          return rejectWithValue(code);
        }
        default: {
          return rejectWithValue(code);
        }
      }
    }
  }
);


export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(signInWithEmailAndPassword.fulfilled, (state, action) => {
      state.status = "idle";
      state.user = action.payload.user;
      state.providerId = action.payload.providerId;
      state.isLoggedIn = action.payload.user !== undefined;
    })
  }
});

export const { setUser } = authSlice.actions;
export const selectIsAuthenticated = (state) => state.users.isLoggedIn;
export const selectUser = (state) => state.auth.user;
export default authSlice.reducer;
