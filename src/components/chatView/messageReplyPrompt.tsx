import { View, Text } from "react-native";
import { IMessage } from "../../models/message.model";
import { IChat } from "../../models/chat.model";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Animated, {
  BounceIn,
  FadeInLeft,
  FadeInRight,
} from "react-native-reanimated";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

interface IMessageReplyPrompt {
  message: IMessage;
  chat: IChat;
  onClose: () => void;
}

export const MessageReplyPrompt = ({
  message,
  chat,
  onClose,
}: IMessageReplyPrompt) => {
  const userId = useSelector((state: RootState) => state.authReducer.user.id);
  const colors = useSelector((state: RootState) => state.colorsReducer.colors);
  return (
    <Animated.View
      style={{ minHeight: 50, flexDirection: "row", alignItems: "center" }}
      entering={FadeInRight.duration(300)}
      exiting={FadeInLeft.duration(300)}
    >
      <View
        style={{
          borderLeftWidth: 5,
          borderLeftColor: "yellow",
          flex: 1,
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            paddingLeft: 10,
            color: "yellow",
            fontWeight: "bold",
          }}
        >
          {userId === message.senderId ? "YOU" : chat.recipiant.name}
        </Text>
        <Text style={{ color: "white", paddingLeft: 10 }}>
          {message.content.content.toString() ?? ""}
        </Text>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: colors.accentColor,
          padding: 5,
          borderRadius: 100,
          marginRight: 10,
        }}
        onPress={onClose}
      >
        <Ionicons name="close" size={25} color="white" />
      </TouchableOpacity>
    </Animated.View>
  );
};
