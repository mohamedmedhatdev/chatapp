import {
  View,
  Text,
  TextInput,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Message } from "../message/message";
import { IChat } from "../../models/chat.model";
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

interface IChatViewProps {
  chatId: number;
}

export const ChatView = ({ chatId }: IChatViewProps) => {
  const scrollViewRef = useRef<Animated.ScrollView | null>(null);
  const keyboardAnimation = useAnimatedKeyboard();
  const form = useForm<{ msg: string }>();
  /* REDUX DATA CALLS */
  const colors = useSelector((state: RootState) => state.colorsReducer.colors);
  const chat = useSelector(
    (state: RootState) => state.chatsReducer.chats[chatId]
  );
  const user = useSelector((state: RootState) => state.authReducer.user);

  const inputStyle = useAnimatedStyle(() => ({
    height: keyboardAnimation.height.value,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    // Reason for this empty use Effect is that this will need to be registerd once and only once as it's an event listener
    Keyboard.addListener("keyboardDidShow", () => {
      scrollViewRef.current?.scrollToEnd();
    });
  }, []);

  useEffect(() => {
    // this timeout is to make sure that the new messages have been already rendered 
    setTimeout(() => scrollViewRef.current?.scrollToEnd(),100);
  }, [chat]);

  const sendMsg = useCallback(() => {
    dispatch(
      chatsActions.sendMessage({
        chatId,
        message: {
          senderId: user.id,
          content: {
            type: "text",
            content: form.getValues().msg,
          },
          timeStamp: new Date(),
        },
      })
    );
    form.setValue("msg","");
  }, [chatId,user,form]);

  return (
    <>
      <View style={styles(colors).topBarContainer}>
        <Text style={styles(colors).topBarText}>{chat.recipiant.name}</Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator
        style={styles(colors).messagesScrollView}
        ref={scrollViewRef}
      >
        {chat.messages.map((x, i) => (
          <Message key={i} message={x} />
        ))}
      </ScrollView>
      <Animated.View style={styles(colors).bottomBarContainer}>
        <TextField
          control={form.control}
          name="msg"
          style={styles(colors).bottomBarInput}
          placeholder="Write Your Message ..."
          placeholderTextColor={"grey"}
          onSubmitEditing={() => {sendMsg();}}
          returnKeyType="send"
        />
        <TouchableOpacity style={styles(colors).sendButton}>
          <Ionicons name="attach-outline" size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles(colors).sendButton} onPress={() => {sendMsg()}}>
          <Ionicons name="send-outline" size={20} color="white" />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={inputStyle} />
    </>
  );
};
