import { NavigationContainer } from "@react-navigation/native";
import React, { useState } from "react";
import { RootStackNavigation } from "./navigations/RootStackNavigation";
import { SplashView } from "./SplashView";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

GoogleSignin.configure();

export const RootApp:React.FC = ()=>{
    const [initialized, setInitialized] = useState(false);

    if(!initialized){
        return(
            <SplashView onFinishLoad={()=>setInitialized(true)}/>
        )
    }
    return(
        <NavigationContainer>
            <RootStackNavigation />
        </NavigationContainer>
    )
}