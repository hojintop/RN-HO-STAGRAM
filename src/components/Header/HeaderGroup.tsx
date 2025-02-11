import { ReactElement } from "react"
import { View } from "react-native"

export const HeaderGroup:React.FC<{
    children: ReactElement | ReactElement[]
}> = (props)=>{
    return(
        <View style={{flex:1, flexDirection:"row"}}>
            {props.children}
        </View>
    )
}