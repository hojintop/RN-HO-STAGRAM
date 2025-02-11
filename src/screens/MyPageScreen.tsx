import React from "react";
import { Header } from "../components/Header/Header";
import { HeaderTitle } from "../components/Header/HeaderTitle";

export const MyPageScreen:React.FC<{}> = (props)=>{
    return(
        <Header>
            <HeaderTitle title="MY-PAGE"></HeaderTitle>
        </Header>
    )
}