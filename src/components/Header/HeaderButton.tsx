import {Button} from "../Button"
import {IconName, Icons} from "../Icons"

export const HeaderButton:React.FC<{
    onPress:()=>void;
    iconName:IconName;
    color:string;
}> = (props)=>{
    return(
        <Button onPress={props.onPress}>
            <Icons name={props.iconName} size={24} color={props.color}/>
        </Button>
    )
}