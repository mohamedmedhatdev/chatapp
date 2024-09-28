import {
  LayoutChangeEvent,
  LayoutRectangle,
  Text,
  TouchableOpacity,
  View,
  ViewProps,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Component, forwardRef, useMemo, useRef, useState } from "react";
import { styles } from "./message.style";
import { IMessage } from "../../models/message.model";
import { RootState } from "../../store/store";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import * as Sharing from "expo-sharing";

import Animated, {
  AnimateProps,
  BounceIn,
  BounceOut,
  FadeIn,
  FadeInLeft,
  FadeInRight,
  FadeOut,
  measure,
  runOnJS,
  runOnUI,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { IChat } from "../../models/chat.model";
import { Ionicons } from "@expo/vector-icons";
import { chatsActions } from "../../store/reducers/chats.reducer";
import { ReactionsBar } from "./reactionsBar";

interface IMessageProps {
  message: IMessage;
  onReply: () => void;
  onReact: (lr: LayoutRectangle) => void;
  onHideReact: () => void;
  customWidth?: number;
  chat: IChat;
  showReaction?: boolean;
}
const END_POSITION = 80;
export const Message = ({
  message,
  onReply,
  chat,
  onReact,
  customWidth,
  showReaction,
  onHideReact,
}: IMessageProps) => {
  const authState = useSelector((state: RootState) => state.authReducer);
  const dispatch = useDispatch();
  const isSender = useMemo(
    () => message.senderId === authState.user.id,
    [message.senderId, authState.user.id]
  );
  const colors = useSelector((state: RootState) => state.colorsReducer.colors);
  const ref = useAnimatedRef();
  const position = useSharedValue(0);
  const reactToMessage = (reaction: string) => {
    dispatch(
      chatsActions.setReaction({
        chatId: chat.chatId,
        msgId: message.id,
        reaction,
      })
    );
  };
  const layout = useSharedValue<LayoutRectangle | undefined>(undefined);

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      if (isSender) {
        if (e.translationX > -END_POSITION) position.value = e.translationX;
      } else {
        if (e.translationX < END_POSITION) position.value = e.translationX;
      }
    })
    .onEnd((e) => {
      position.value = 0;
      if (isSender) {
        if (e.translationX < -END_POSITION) runOnJS(onReply)();
      } else {
        if (e.translationX > END_POSITION) runOnJS(onReply)();
      }
    });
  const longPressGesture = Gesture.LongPress()
    .runOnJS(true)
    .onStart(() => {
      if (layout.value) onReact(layout.value);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: position.value }],
  }));

  return (
    <GestureDetector
      gesture={Gesture.Race(longPressGesture, Gesture.Exclusive(panGesture))}
    >
      <Animated.View
        onLayout={(e) => {
          runOnUI(() => {
            let res = measure(ref);
            console.log(res);
            if (res)
              layout.value = {
                width: res?.width,
                height: res?.height,
                x: res?.pageX,
                y: res?.pageY,
              };
          })();
        }}
        ref={ref}
        style={[
          styles(isSender, colors).root,
          animatedStyle,
          ...(customWidth ? [{ minWidth: customWidth }] : []),
        ]}
        entering={
          isSender ? FadeInRight.duration(150) : FadeInLeft.duration(150)
        }
      >
        {showReaction && (
          <ReactionsBar
            onReact={(r) => {
              reactToMessage(r);
              onHideReact();
            }}
          />
        )}
        {message.baseMsg && (
          <View
            style={{
              borderLeftWidth: 5,
              borderLeftColor: "yellow",
              justifyContent: "center",
              marginBottom: 10,
              backgroundColor: colors.accentColor,
              padding: 10,
              borderRadius: 5,
            }}
          >
            <Text
              style={{
                paddingLeft: 10,
                color: "yellow",
                fontWeight: "bold",
              }}
            >
              {message.senderId === authState.user.id
                ? "You"
                : chat.recipiant.name}
            </Text>
            <Text style={{ color: "white", paddingLeft: 10 }}>
              {message.baseMsg.content.content.toString() ?? ""}
            </Text>
          </View>
        )}

        {message.content.type === "text" && (
          <Text style={{ color: colors.messageTextColor }}>
            {message.content.content.toString()}
          </Text>
        )}
        {message.content.type === "file" && (
          <TouchableOpacity
            onPress={() => {
              Sharing.shareAsync((message.content as any).uri);
            }}
            style={{
              width: "100%",
              height: 60,
              backgroundColor: colors.inputColor,
              borderRadius: 10,
              flexDirection: "row",
              padding: 10,
            }}
          >
            <Ionicons name="file-tray" size={32} color="white" />
            <Text style={{ color: "white", fontSize: 24, marginHorizontal: 5 }}>
              {message.content.fileName}
            </Text>
          </TouchableOpacity>
        )}

        <Text style={styles(isSender, colors).timeStamp}>
          {message.timeStamp}
        </Text>
        {message.reaction && (
          <Animated.View
            entering={BounceIn.duration(300)}
            exiting={BounceOut.duration(300)}
            style={{
              position: "absolute",
              width: 30,
              height: 30,
              backgroundColor: colors.barsColor,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 20,
              zIndex: 10,
              bottom: -20,
              [isSender ? "left" : "right"]: -20,
            }}
          >
            <Text>{message.reaction}</Text>
          </Animated.View>
        )}
      </Animated.View>
    </GestureDetector>
  );
};
