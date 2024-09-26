import {
  View,
  Text,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Message } from "../message/message";
import { useCallback, useEffect, useRef, useState } from "react";
import Animated, {
  useAnimatedKeyboard,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./chatView.styles";
import { chatsActions } from "../../store/reducers/chats.reducer";
import { TextField } from "../form/inputField";
import { useForm } from "react-hook-form";
import { ChatTopBar } from "./topBar";
import { MessageReplyPrompt } from "./messageReplyPrompt";
import * as DocumentPicker from "expo-document-picker";
import { IMessage } from "../../models/message.model";

interface IChatViewProps {
  chatId: number;
}

export const ChatView = ({ chatId }: IChatViewProps) => {
  const scrollViewRef = useRef<Animated.ScrollView | null>(null);
  const keyboardAnimation = useAnimatedKeyboard();
  const form = useForm<{ msg: string; search: string }>({
    defaultValues: { search: "" },
  });
  const searchInputValue = form.watch("search");

  /* REDUX DATA CALLS */
  const colors = useSelector((state: RootState) => state.colorsReducer.colors);
  const chat = useSelector(
    (state: RootState) => state.chatsReducer.chats[chatId]
  );
  const user = useSelector((state: RootState) => state.authReducer.user);
  const dispatch = useDispatch();

  const [replyData, setReplyData] = useState<{
    msg?: IMessage;
    isReplying: boolean;
  }>({ isReplying: false });

  const inputStyle = useAnimatedStyle(() => ({
    height: keyboardAnimation.height.value,
  }));

  useEffect(() => {
    // Reason for this empty use Effect is that this will need to be registerd once and only once as it's an event listener
    Keyboard.addListener("keyboardDidShow", () => {
      scrollViewRef.current?.scrollToEnd();
    });
    sendMsg(false, "New Message From OTA");
  }, []);

  useEffect(() => {
    // this timeout is to make sure that the new messages have been already rendered
    setTimeout(() => scrollViewRef.current?.scrollToEnd(), 100);
  }, [chat]);

  const sendMsg = useCallback(
    (isSender: boolean, customMsg?: string) => {
      console.log(replyData.isReplying);
      dispatch(
        chatsActions.sendMessage({
          chatId,
          message: {
            baseMsg: replyData.isReplying ? replyData.msg : undefined,
            senderId: isSender ? user.id : chat.recipiant.id,
            content: {
              type: "text",
              content:
                !isSender && customMsg ? customMsg : form.getValues().msg,
            },
            timeStamp: new Date().toLocaleDateString("en-us"),
          },
        })
      );
      if (!customMsg) {
        form.setValue("msg", "");
      }
      if (isSender) {
        setReplyData({ isReplying: false, msg: undefined });
      }
    },
    [chatId, user, form, replyData]
  );

  return (
    <>
      <ChatTopBar form={form} chat={chat} />
      <Animated.ScrollView
        showsVerticalScrollIndicator
        style={styles(colors).messagesScrollView}
        ref={scrollViewRef}
      >
        {chat.messages
          .filter((x) => {
            if (searchInputValue.trim().length > 0) {
              return x.content.content.toString().includes(searchInputValue);
            }
            return true;
          })
          .map((x, i) => (
            <Message
              key={i}
              message={x}
              chat={chat}
              onReply={() => {
                setReplyData({ isReplying: true, msg: x });
              }}
            />
          ))}
        {/* This View is to make sure that there is some space in the end of the chat */}
        <View style={{ height: 50 }} />
      </Animated.ScrollView>
      {replyData.isReplying && (
        <MessageReplyPrompt
          message={replyData.msg!}
          chat={chat}
          onClose={() => {
            setReplyData({ msg: undefined, isReplying: false });
          }}
        />
      )}
      <Animated.View style={styles(colors).bottomBarContainer}>
        <TextField
          control={form.control}
          name="msg"
          style={styles(colors).bottomBarInput}
          placeholder="Write Your Message ..."
          placeholderTextColor={"grey"}
          onSubmitEditing={() => {
            sendMsg(true);
          }}
          returnKeyType="send"
        />
        <TouchableOpacity
          style={styles(colors).sendButton}
          onPress={async () => {
            let result = await DocumentPicker.getDocumentAsync();
            const data = await fetch(result?.assets![0].uri);
            dispatch(
              chatsActions.sendMessage({
                chatId,
                message: {
                  baseMsg: replyData.isReplying ? replyData.msg : undefined,
                  senderId: user.id,
                  content: {
                    uri: result.assets![0].uri,
                    type: "file",
                    fileName: result.assets![0].name,
                    content: await data.blob(),
                  },
                  timeStamp: new Date().toLocaleDateString("en-us"),
                },
              })
            );
          }}
        >
          <Ionicons name="camera-outline" size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles(colors).sendButton}
          onPress={() => {
            sendMsg(true);
          }}
        >
          <Ionicons name="send-outline" size={20} color="white" />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={inputStyle} />
    </>
  );
};
