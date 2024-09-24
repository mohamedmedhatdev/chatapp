import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IChat } from "../../models/chat.model";
import { IMessage } from "../../models/message.model";

/* MOCKUP DATA */
const mockupChat: IChat = {
  chatId: 0,
  recipiant: { id: 2, name: "Ahmed" },
  messages: [
    {
      senderId: 1,
      content: {
        type: "text",
        content: "THIS IS A MESS OTA 1 AGE",
      },
      timeStamp: new Date().toLocaleDateString("en-us"),
    },
    {
      senderId: 2,
      content: {
        type: "text",
        content: "THIS IS A MESSAGE",
      },
      timeStamp: new Date().toLocaleDateString("en-us"),
    },
  ],
};

interface ISendMessageAction {
  message: IMessage;
  chatId: number;
}

export interface ChatsState {
  chats: IChat[];
}

const initialState: ChatsState = {
  chats: [mockupChat],
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
