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
import { styles } from "./messageReplyPrompt.style";

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
      style={styles(colors).animatedView}
      entering={FadeInRight.duration(300)}
      exiting={FadeInLeft.duration(300)}
    >
      <View style={styles(colors).viewContainer}>
        <Text style={styles(colors).nameTitle}>
          {userId === message.senderId ? "YOU" : chat.recipiant.name}
        </Text>
        <Text style={styles(colors).message}>
          {message.content.content.toString() ?? ""}
        </Text>
      </View>
      <TouchableOpacity style={styles(colors).closeButton} onPress={onClose}>
        <Ionicons name="close" size={25} color="white" />
      </TouchableOpacity>
    </Animated.View>
  );
};
