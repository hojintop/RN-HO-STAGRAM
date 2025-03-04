import { View } from "react-native";
import Typography from "./Typography";
import { ReactElement } from "react";

export const Badge:React.FC<{
  children?: ReactElement | ReactElement[];
  fontSize?: number;
}> = (props) => {
  return (
    <View>
      <View>
        {props.children}

        <View
          style={{
            width: 16 ,
            height: 16,
            borderRadius: 8,
            backgroundColor: "red",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            right: -5,
            top: -5,
          }}
        >
          <Typography fontSize={props.fontSize} color={"white"}>N</Typography>
        </View>
      </View>
    </View>
  );
};
