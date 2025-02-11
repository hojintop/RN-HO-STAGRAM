import { ThunkAction } from "redux-thunk";
import { sleep } from "../utils/sleep";
import { TypeRootReducer } from "../store";
import { UserInfo } from "../@types/UserInfo";

export const SET_USER_INFO = "SET_USER_INFO" as const;

export const setUserInfo = (user:UserInfo)=>{
    return{
        type: SET_USER_INFO,
        user
    }
}

export const signIn = ():TypeUserThunkAction => async (dispatch)=>{
    await sleep(1000);
    dispatch(setUserInfo({
        name: "name",
        profileImage: "profileImage",
        uid: "uid",
    }));
}

// 2.thunk action 에 대한 타입 정의
export type TypeUserThunkAction = ThunkAction<Promise<void>,TypeRootReducer,undefined,TypeUserInfoActions>;

// 1.ACTION 에 대한 타입 정의
export type TypeUserInfoActions = | ReturnType<typeof setUserInfo>