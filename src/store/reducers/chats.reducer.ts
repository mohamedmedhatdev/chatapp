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
      id: 0,
      senderId: 1,
      content: {
        type: "text",
        content: "THIS IS A MESS OTA 1 AGE",
      },
      timeStamp: new Date().toLocaleDateString("en-us"),
    },
    {
      id: 1,
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
  message: Omit<IMessage, "id">;
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
    switchMessageLike(
      state,
      action: PayloadAction<{ chatId: number; msgId: number }>
    ) {
      state.chats = state.chats.map((x) =>
        x.chatId === action.payload.chatId
          ? {
              ...x,
              messages: x.messages.map((y) =>
                y.id === action.payload.msgId
                  ? { ...y, isLiked: !y.isLiked }
                  : y
              ),
            }
          : x
      );
    },
    sendMessage(state, action: PayloadAction<ISendMessageAction>) {
      // Not best performance better to have a map with the id being the key and the value being the actual message (Better Performance )
      state.chats = state.chats.map((x) =>
        x.chatId === action.payload.chatId
          ? {
              ...x,
              messages: [
                ...x.messages,
                { ...action.payload.message, id: x.messages.length },
              ],
            }
          : x
      );
    },
  },
});

export const chatsActions = chatsSlice.actions;
export const chatsReducer = chatsSlice.reducer;
