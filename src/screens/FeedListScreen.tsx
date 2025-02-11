import React from "react"
import { Header } from "../components/Header/Header"
import { HeaderTitle } from "../components/Header/HeaderTitle"

export const FeedListScreen:React.FC<{}> = (props)=>{
    return(
        <Header>
            <HeaderTitle title="FEED-LIST"></HeaderTitle>
        </Header>
    )
}