import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import journalSlice from "./journal/journalSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    journal: journalSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
