import { StyleSheet } from "react-native";
import { BackgroundScreen } from "./src/screens/background/background.screen";
import { Provider } from "react-redux";
import { store } from "./src/store/store";
import { ChatView } from "./src/components/chatView/chatView";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <BackgroundScreen>
          <ChatView chatId={0} />
        </BackgroundScreen>
      </Provider>
    </GestureHandlerRootView>
  );
}
