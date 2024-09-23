import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/auth.reducer";
import { colorsReducer } from "./reducers/colors.reducer";
import { chatsReducer } from "./reducers/chats.reducer";

export const store = configureStore({
  reducer: {
    authReducer,
    colorsReducer,
    chatsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
