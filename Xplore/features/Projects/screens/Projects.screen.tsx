import * as React from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import ProjectCoreScreen from "./ProjectCoreScreen/ProjectCoreScreen.component";
import TopHeader from "../../../navigation/TopHeader.component";
import { NavigationProp } from "@react-navigation/native";
import styles from "./Projects.styles";
import { useThemeColor } from "../../../hooks";

interface ProjectsProps {
  navigation: NavigationProp<any>;
}

const Home = (props: ProjectsProps) => {
  const homeBackground = useThemeColor("backgroundSecondary");

  return (
    <SafeAreaView
      style={[styles.safeAreaStyle, { backgroundColor: homeBackground }]}
    >
      <TopHeader
        screenName={"Projects"}
        navigation={props.navigation}
        name="edit"
      />
      <TouchableOpacity
        onPress={() => props.navigation.navigate("ProfileEdit")}
      />
      <ProjectCoreScreen navigation={props.navigation} />
    </SafeAreaView>
  );
};

export default Home;
