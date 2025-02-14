import { useSelector } from "react-redux"
import { TypeRootReducer } from "../store"
import { FeedInfo } from "../@types/FeedInfo"
import { UserInfo } from "../@types/UserInfo"

export const useMyInfo = () => {
    return useSelector<TypeRootReducer, UserInfo | null> ((state)=>state.userInfo.userInfo);
}

// 나의 피드 리스트만 불러옴
export const useMyFeedList = () =>{
    return useSelector<TypeRootReducer, FeedInfo[]>((state)=>state.userInfo.myFeedList);
}