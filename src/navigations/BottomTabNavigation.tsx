import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "../screens/HomeScreen";

import { IconName } from "../components/Icons";
import { TabIcon } from "../components/TabIcon";
import { MyPageScreen } from "../screens/MyPageScreen";

export type BottomTabParamList = {
    Home: undefined,
    MyPage: undefined,
}

const Tabs = createBottomTabNavigator<BottomTabParamList>();

export const BottomTabNavigation = ()=>{
    return(
        <Tabs.Navigator
            screenOptions={({route}) =>{
                function getIconName():IconName{
                    if(route.name === "Home"){
                        return "home";
                    }

                    return "person";
                }

                return{
                    headerShown: false,
                    tabBarIcon: ({focused,color,size})=>{
                        return(
                            <TabIcon iconName={getIconName()} iconSize={30} iconColor={focused ? "orange" : color}/>
                        )
                    }
                }
            }}
        >
            <Tabs.Screen name="Home" component={HomeScreen} />
            <Tabs.Screen name="MyPage" component={MyPageScreen} />
        </Tabs.Navigator>
    )
}