import { StyleSheet } from "react-native";
import { BackgroundScreen } from "./src/screens/background/background.screen";
import { Provider } from "react-redux";
import { store } from "./src/store/store";
import { ChatView } from "./src/components/chatView/chatView";

export default function App() {
  return (
    <Provider store={store}>
      <BackgroundScreen>
        <ChatView
          chatId={0}
        />
      </BackgroundScreen>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
});
