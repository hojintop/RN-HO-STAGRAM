import { useState } from "react";
import { StyleProp, TextInput, TextStyle, View } from "react-native"

export const MultiLineInput:React.FC<{
    value:string;
    onChangeText:(text:string)=>void;
    placeholder:string;
    fontSize?:number;
    height?:number;
    onSubmitEditing:()=>void;
}> = (props)=>{
    const [focused, setFocused] = useState(false);

    return(
        <View style={{
            alignSelf: "stretch",
            paddingHorizontal: 10,
            paddingVertical: 8,
            borderRadius: 4,
            borderWidth: 0.5,
            borderColor: focused ? "black":"gray",
        }}>
            <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                multiline
                value={props.value}
                onChangeText={props.onChangeText}
                placeholder={props.placeholder}
                style={{fontSize: props.fontSize ?? 20, height:props.height ?? 200}}
                onFocus={()=>{
                    setFocused(true);
                }}
                onBlur={()=>{
                    setFocused(false);
                }}
                onSubmitEditing={props.onSubmitEditing}
            />
        </View>
    )
}