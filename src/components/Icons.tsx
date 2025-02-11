import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';

export type IconName = keyof typeof Ionicons.glyphMap;
export const Icons:React.FC<{
    name:IconName;
    size:number;
    color:string;
}> = (props) => {
    return(
        <Ionicons 
            name={props.name}
            size={props.size}
            color={props.color}
        />
    )
}