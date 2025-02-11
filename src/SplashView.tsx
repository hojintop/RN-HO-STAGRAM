import { ActivityIndicator, View } from "react-native";
import Typography from "./components/Typography";
import { useEffect } from "react";

export const SplashView: React.FC<{
  onFinishLoad: () => void;
}> = (props) => {

  useEffect(() => {
    setTimeout(() => {
      props.onFinishLoad();
    }, 1000);
  }, []);
  
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Typography fontSize={30}>SPLASH VIEW</Typography>
      <ActivityIndicator />
    </View>
  );
};
