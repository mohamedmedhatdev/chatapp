import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IChat } from "../../models/chat.model";
import { IMessage } from "../../models/message.model";

interface ISendMessageAction {
  message: IMessage;
  chatId: number;
}

export interface ChatsState {
  chats: IChat[];
}

const initialState: ChatsState = {
  chats: [{ chatId: 0, messages: [], recipiant: { id: 10, name: "Amir" } }],
};

export const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    sendMessage(state, action: PayloadAction<ISendMessageAction>) {
      state.chats = state.chats.map((x) =>
        x.chatId === action.payload.chatId
          ? { ...x, messages: [...x.messages, action.payload.message] }
          : x
      );
    },
  },
});

export const chatsActions = chatsSlice.actions;
export const chatsReducer = chatsSlice.reducer;
