import { useState } from "react";
import { StyleProp, TextInput, TextProps, TextStyle, View } from "react-native";

export const SingleLineInput: React.FC<{
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  onSubmitEditing?: () => void;
  style?: StyleProp<TextStyle>;
  fontSize?: number;
}> = (props) => {
  const [focused, setFocused] = useState(false);

  return (
    <View
      style={{
        alignSelf: "stretch",
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: focused ? "black" : "gray",
      }}
    >
      <TextInput
        autoCorrect={false}
        autoCapitalize={"none"}
        value={props.value}
        onChangeText={props.onChangeText}
        placeholder={props.placeholder}
        style={[props.style, { fontSize: props.fontSize ?? 20 }]}
        onFocus={() => {
          setFocused(true);
        }}
        onBlur={() => {
          setFocused(false);
        }}
        onSubmitEditing={props.onSubmitEditing}
      />
    </View>
  );
};
