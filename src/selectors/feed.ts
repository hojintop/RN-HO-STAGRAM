import { useSelector } from "react-redux"
import { TypeRootReducer } from "../store"
import { FeedInfo } from "../@types/FeedInfo"

//전체 피드리스트 불러옴
export const useTotalFeedList = ()=>{
    return useSelector<TypeRootReducer, FeedInfo[]>((state)=> state.feedList.list);
}