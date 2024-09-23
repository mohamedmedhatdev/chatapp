import { View, Text } from "react-native";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { styles } from "./message.style";
import { IMessage } from "../../models/message.model";
import { RootState } from "../../store/store";
import Animated, {
  FadeInLeft,
  FadeInRight,
} from "react-native-reanimated";

interface IMessageProps {
  message: IMessage;
}
export const Message = ({ message }: IMessageProps) => {
  const authState = useSelector((state: RootState) => state.authReducer);
  const isSender = useMemo(
    () => message.senderId === authState.user.id,
    [message.senderId, authState.user.id]
  );
  const colors = useSelector((state: RootState) => state.colorsReducer.colors);
  return (
    <>
      <Animated.View
        style={styles(isSender, colors).root}
        entering={
          isSender ? FadeInRight.duration(150) : FadeInLeft.duration(150)
        }
      >
        <Text style={{ color: colors.messageTextColor }}>
          {message.content.content.toString()}
        </Text>

        <Text style={styles(isSender, colors).timeStamp}>
          {message.timeStamp.toLocaleDateString("en-us")}
        </Text>
      </Animated.View>
    </>
  );
};
