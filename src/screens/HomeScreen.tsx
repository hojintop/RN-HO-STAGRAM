import React from "react";
import { Header } from "../components/Header/Header";
import { HeaderTitle } from "../components/Header/HeaderTitle";

export const HomeScreen:React.FC<{}> = (props)=>{
    return(
        <Header>
            <HeaderTitle title="HOME"></HeaderTitle>
        </Header>
    )
}