import { NavigationProp } from "@react-navigation/native";
import { render } from "@testing-library/react-native";
import Profile from "./Profile.screen";

describe("Profile />", () => {
  it("renders correctly", () => {
    const container = render(<Profile />);
    expect(container).toBeTruthy();
  });
});
