import { ShadowView } from "../ShadowView";
import { Avatar as _Avatar } from "react-native-paper";
import { useThemeColor } from "../../hooks";
import styles from "./Avatar.styles";

interface AvatarProps {
  name: string;
  imageURL?: string;
  size?: "small" | "medium" | "large" | "xlarge";
}

export const Avatar = (props: AvatarProps) => {
  // Default size to "large"
  const { size = "large", name, imageURL } = props;

  const textAvatarBackground = useThemeColor("primary");
  const avatarDisplayName = name.charAt(0).toUpperCase();
  const avatarSize =
    size === "small"
      ? 31
      : size === "medium"
      ? 45
      : size === "large"
      ? 60
      : 135;

  return (
    <ShadowView
      backgroundColor="backgroundSecondary"
      style={styles.avatarContainer}
    >
      {imageURL ? (
        <_Avatar.Image source={{ uri: `${imageURL}` }} size={avatarSize} />
      ) : (
        <_Avatar.Text
          label={avatarDisplayName}
          size={avatarSize}
          style={{
            backgroundColor: textAvatarBackground,
          }}
        />
      )}
    </ShadowView>
  );
};
