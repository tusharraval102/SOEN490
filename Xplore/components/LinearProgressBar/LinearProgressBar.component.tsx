import { StyleProp, ViewStyle } from "react-native";
import { ProgressBar } from "react-native-paper";
import { colors } from "../../constants";
import { useThemeColor } from "../../hooks";
import { View } from "../View";
import styles from "./LinearProgressBar.styles";

interface LinearProgressBarProps {
  color?: keyof typeof colors.light & keyof typeof colors.dark;
  progress: number;
  style?: StyleProp<ViewStyle>;
}

export const LinearProgressBar = (props: LinearProgressBarProps) => {
  const { color = "primary", progress = 0.8, style } = props;
  const customProgressColor = useThemeColor(color);
  const background = useThemeColor("backgroundSecondary");

  return (
    <View>
      <ProgressBar
        progress={progress}
        color={customProgressColor}
        style={[
          style,
          styles.progressBarMain,
          { backgroundColor: background, borderColor: background },
        ]}
      />
    </View>
  );
};
