import { Dimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Spacer } from "../Spacer";
import { ReactElement } from "react";



export const Header: React.FC<{
  children: ReactElement | ReactElement[]
}> = (props) => {
  const {width} = Dimensions.get("window");
  const insets = useSafeAreaInsets();

  return (
      <View style={{ paddingTop: insets.top }}>
        <View
          style={{
            width: width,
            flexDirection: "row",
            height: 58,
            borderBottomColor: "grey",
            borderBottomWidth: 0.5,
            alignItems: "center",
          }}
        >
          <Spacer horizontal={true} space={12} />

          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            {props.children}
          </View>

          <Spacer horizontal={true} space={12} />
        </View>
      </View>
  );
};
