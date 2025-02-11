import { View } from "react-native"
import {IconName, Icons} from "./Icons"
import {Badge} from "./Badge"
import React from "react"

export const TabIcon:React.FC<{
    isBadge?:boolean;
    iconName:IconName;
    iconSize:number;
    iconColor:string;
}> = (props)=>{
    if(props.isBadge){
        return(
            <View>
                <Badge fontSize={10}>
                    <Icons 
                        name={props.iconName}
                        size={props.iconSize}
                        color={props.iconColor}
                    />
                </Badge>
            </View>
        )
    }

    return(
        <View>
            <Icons 
                name={props.iconName}
                size={props.iconSize}
                color={props.iconColor}
            />
        </View>
    )
    
}