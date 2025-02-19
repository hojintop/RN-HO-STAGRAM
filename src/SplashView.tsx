import { ActivityIndicator, View } from "react-native";
import Typography from "./components/Typography";
import { useEffect, useState } from "react";
import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
import { useDispatch } from "react-redux";
import { signIn, TypeUserDispatch } from "./actions/user";

export const SplashView: React.FC<{
  onFinishLoad: () => void;
}> = (props) => {
  const [showLoginButton, setShowLoginButton] = useState(false);
  const dispatch = useDispatch<TypeUserDispatch>();

  async function appInit() {
    try {
      const response = await GoogleSignin.signInSilently();
      if (response.data !== null) {
        // 로그인에 어떠한 처리...
        await dispatch(signIn(response.data.idToken ?? "Unknown Id"));
        props.onFinishLoad();
      }
    } catch (ex) {
      setShowLoginButton(true);
    }
  }

  async function onPressGoogleSignin() {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();

      if (response.data !== null) {
        //signin
        await dispatch(signIn(response.data.idToken ?? "Unknown Id"));
        props.onFinishLoad();
      }
    } catch (ex) {
      setShowLoginButton(true);
    }
  }

  useEffect(() => {
    // setTimeout(() => {
    //   props.onFinishLoad();
    // }, 1000);
    appInit();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {showLoginButton ? (
        <GoogleSigninButton onPress={onPressGoogleSignin} />
      ) : (
        <>
          <Typography fontSize={30}>SPLASH VIEW</Typography>
          <ActivityIndicator />
        </>
      )}
    </View>
  );
};
