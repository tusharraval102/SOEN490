import { NavigationProp } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native";
import { useThemeColor } from "../../../../hooks/useThemeColor";
import ChatDetailsHeader from "./components/ChatDetailsHeader/ChatDetailsHeader.component";
import Conversation from "./components/Conversation/Conversation.component";
import ChatTextInput from "./components/ChatTextInput/ChatTextInput.component";
import styles from "./ChatDetails.styles";

interface ChatDetailsProps {
  navigation: NavigationProp<any>;
}

const ChatDetails = (props: ChatDetailsProps) => {
  const route = useRoute();
  let { name, contactEmail }: any = route.params;
  const backgroundSecondary = useThemeColor("backgroundSecondary");

  return (
    <SafeAreaView
      style={[styles.safeAreaStyle, { backgroundColor: backgroundSecondary }]}
    >
      <ChatDetailsHeader username={name} navigation={props.navigation} />
      <Conversation contactEmail={contactEmail} navigation={props.navigation} />
      <ChatTextInput contactEmail={contactEmail} />
    </SafeAreaView>
  );
};

export default ChatDetails;
