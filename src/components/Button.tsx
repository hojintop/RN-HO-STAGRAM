import React, { ReactElement } from "react";
import { Pressable } from "react-native";

export const Button:React.FC<{
  onPressIn?:()=>void;
  onPressOut?:()=>void;
  onPress:()=>void;
  hitSlop?:{left:number, right:number, top:number, bottom:number};
  paddingHorizontal?:number;
  paddingVertical?:number;
  children?:ReactElement | ReactElement[]
}> = (props) => {
  return (
    <Pressable
      onPressIn={props.onPressIn}
      onPressOut={props.onPressOut}
      onPress={props.onPress}
      hitSlop={props.hitSlop ?? {left:0, right:0, top:0, bottom:0}}
      style={{
        paddingHorizontal: props.paddingHorizontal,
        paddingVertical: props.paddingVertical,
      }}
    >
      {props.children}
    </Pressable>
  );
};
