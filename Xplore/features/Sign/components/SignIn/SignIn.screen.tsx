import { NavigationProp } from "@react-navigation/native";
import * as React from "react";
import {
  View,
  PrimaryButton,
  SecondaryButton,
  TextInput,
} from "../../../../components";
import styles from "./SignIn.styles";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { useAuth } from "../../../../hooks/useAuth";
interface SignInProps {
  navigation: NavigationProp<any>;
}

const SignIn = (props: SignInProps) => {
  const { navigation } = props;
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const { signIn, loading } = useAuth();

  return (
    <View style={styles.container}>
      <Spinner
        visible={loading}
        textContent={"Hang tight!\n We're signing you in ⚡"}
        textStyle={styles.loadingScreen}
        animation={"fade"}
      />
      <TextInput
        placeHolder="Username"
        iconName="user"
        onChangeText={(thisEmail: string) => setEmail(thisEmail)}
      />
      <TextInput
        placeHolder="Password"
        iconName="lock"
        secureTextEntry
        onChangeText={(thisPassword: string) => setPassword(thisPassword)}
      />
      <PrimaryButton
        label="SIGN IN"
        style={styles.PrimaryButton}
        onPress={() => {
          signIn(email, password);
          setEmail("");
          setPassword("");
        }}
      />
      <SecondaryButton
        label="FORGOT PASSWORD"
        style={styles.SecondaryButton}
        onPress={() => navigation.navigate("ForgotPassword")}
      />
    </View>
  );
};

export default SignIn;
