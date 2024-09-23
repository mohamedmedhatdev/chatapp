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
import { useEffect, useRef, useState } from "react";
import Animated, {
  useAnimatedKeyboard,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./chatView.styles";

interface IChatViewProps {
  chat: IChat;
}

export const ChatView = ({ chat }: IChatViewProps) => {
  const scrollViewRef = useRef<Animated.ScrollView | null>(null);
  const keyboardAnimation = useAnimatedKeyboard();
  const colors = useSelector((state: RootState) => state.colorsReducer.colors);
  const chatViewStyle = useAnimatedStyle(() => {
    return {};
  });
  const inputStyle = useAnimatedStyle(() => ({
    height: keyboardAnimation.height.value,
  }));
  useEffect(() => {
    scrollViewRef.current?.scrollToEnd();
  }, [chat]);
  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", () => {
      scrollViewRef.current?.scrollToEnd();
    });
  }, []);
  return (
    <>
      <View style={styles(colors).topBarContainer}>
        <Text style={styles(colors).topBarText}>{chat.recipiant.name}</Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator
        style={{
          flex: 1,
          backgroundColor: colors.chatBackgroundColor,
          overflow: "hidden",
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
        }}
        ref={scrollViewRef}
      >
        <View style={{ marginTop: 35 }} />
        {chat.messages.map((x, i) => (
          <Message message={x} />
        ))}
      </ScrollView>
      <Animated.View style={styles(colors).bottomBarContainer}>
        <TextInput style={styles(colors).bottomBarText} />
        <TouchableOpacity style={styles(colors).sendButton}>
          <Ionicons name="attach-outline" size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles(colors).sendButton}>
          <Ionicons name="send-outline" size={20} color="white" />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={inputStyle} />
    </>
  );
};
