import { useState } from "react";
import { TextInput as RNTextInput, TouchableOpacity } from "react-native";
import { View, ShadowView, Icon } from "../../../../../../components";
import { useThemeColor } from "../../../../../../hooks";
import { useQuery } from "react-query";
import api from "../../../../../../services/appwrite/api";
import { COLLECTION_ID_MESSAGES } from "@env";
import styles from "./ChatTextInput.styles";

interface ChatTextInputProps {
  contactEmail: string;
}

const ChatTextInput = (props: ChatTextInputProps) => {
  const bodyText = useThemeColor("bodyText");
  const smallText = useThemeColor("smallText");
  const [message, setMessage] = useState("");

  // Quering current user's data
  const { data: userdata } = useQuery("user data", () => api.getAccount());
  let usrEmail: string = userdata?.email as string;

  // onSendClick Function
  const onSendClick = (msgData: any) => {
    api.createDocument(COLLECTION_ID_MESSAGES, msgData);
  };

  return (
    <View backgroundColor="background">
      <ShadowView
        style={styles.textInputContainer}
        backgroundColor="backgroundSecondary"
      >
        <View style={styles.rightInputItems}>
          <RNTextInput
            placeholderTextColor={smallText}
            placeholder={"Message ..."}
            value={message}
            onChangeText={(thisMessage) => setMessage(thisMessage)}
            style={[styles.textInput, { color: bodyText }]}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            if (message !== "") {
              const msgData = {
                From: usrEmail,
                To: props.contactEmail,
                Message: message,
              };
              onSendClick(msgData);
              setMessage("");
            }
          }}
        >
          <Icon name="send" color={message !== "" ? "primary" : "smallText"} />
        </TouchableOpacity>
      </ShadowView>
    </View>
  );
};

export default ChatTextInput;
