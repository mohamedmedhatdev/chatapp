import { Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";
import { styles } from "./message.style";
import { IMessage } from "../../models/message.model";
import { RootState } from "../../store/store";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

import Animated, {
  BounceIn,
  BounceOut,
  FadeInLeft,
  FadeInRight,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { IChat } from "../../models/chat.model";
import { Ionicons } from "@expo/vector-icons";
import { chatsActions } from "../../store/reducers/chats.reducer";

interface IMessageProps {
  message: IMessage;
  onReply: () => void;
  chat: IChat;
}
const END_POSITION = 80;
export const Message = ({ message, onReply, chat }: IMessageProps) => {
  const authState = useSelector((state: RootState) => state.authReducer);
  const dispatch = useDispatch();
  const isSender = useMemo(
    () => message.senderId === authState.user.id,
    [message.senderId, authState.user.id]
  );
  const colors = useSelector((state: RootState) => state.colorsReducer.colors);
  const position = useSharedValue(0);
  const likeMessage = () => {
    dispatch(
      chatsActions.switchMessageLike({
        chatId: chat.chatId,
        msgId: message.id,
      })
    );
  };
  const doubleTapGesture = Gesture.Tap()
    .maxDuration(300)
    .numberOfTaps(2)
    .onStart(() => {
      runOnJS(likeMessage)();
    });
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

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: position.value }],
  }));

  return (
    <GestureDetector gesture={Gesture.Exclusive(panGesture, doubleTapGesture)}>
      <Animated.View
        style={[styles(isSender, colors).root, animatedStyle]}
        entering={
          isSender ? FadeInRight.duration(150) : FadeInLeft.duration(150)
        }
      >
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
        <Text style={{ color: colors.messageTextColor }}>
          {message.content.content.toString()}
        </Text>

        <Text style={styles(isSender, colors).timeStamp}>
          {message.timeStamp}
        </Text>
        {message.isLiked && (
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
              bottom: -20,
              [isSender ? "left" : "right"]: -20,
            }}
          >
            <Ionicons name="heart" size={13} color="red" />
          </Animated.View>
        )}
      </Animated.View>
    </GestureDetector>
  );
};
