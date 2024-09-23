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

  const inputStyle = useAnimatedStyle(() => ({
    height: keyboardAnimation.height.value,
  }));

  useEffect(() => {
    // Reason for this empty use Effect is that this will need to be registerd once and only once as it's an event listener
    Keyboard.addListener("keyboardDidShow", () => {
      scrollViewRef.current?.scrollToEnd();
    });
  }, []);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd();
  }, [chat]);

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
        <TextInput
          style={styles(colors).bottomBarInput}
          placeholder="Write Your Message ..."
          placeholderTextColor={"grey"}
        />
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
