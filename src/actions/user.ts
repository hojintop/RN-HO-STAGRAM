import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { sleep } from "../utils/sleep";
import { TypeRootReducer } from "../store";
import { UserInfo } from "../@types/UserInfo";
import { FeedInfo } from "../@types/FeedInfo";

export const SET_USER_INFO = "SET_USER_INFO" as const;

export const GET_MY_FEED_REQUEST = "GET_MY_FEED_REQUEST" as const;
export const GET_MY_FEED_SUCCESS = "GET_MY_FEED_SUCCESS" as const;
export const GET_MY_FEED_FAILURE = "GET_MY_FEED_FAILURE" as const;

export const setUserInfo = (user: UserInfo) => {
  return {
    type: SET_USER_INFO,
    user,
  };
};

export const getMyFeedRequest = () => {
  return {
    type: GET_MY_FEED_REQUEST,
  };
};

export const getMyFeedSuccess = (list: FeedInfo[]) => {
  return {
    type: GET_MY_FEED_SUCCESS,
    list,
  };
};

export const getMyFeedFailure = () => {
  return {
    type: GET_MY_FEED_FAILURE,
  };
};

export const signIn = (): TypeUserThunkAction => async (dispatch) => {
  await sleep(1000);
  dispatch(
    setUserInfo({
      name: "test_name",
      profileImage: "test_profileImage",
      uid: "test_uid",
    })
  );
};

// thunk action
export const getMyFeedList = (): TypeUserThunkAction => async (dispatch) => {
  dispatch(getMyFeedRequest());

  await sleep(500);

  dispatch(
    getMyFeedSuccess([
      {
        id: "ID_01",
        content: "CONTENT_01",
        writer: {
          name: "WRITE_NAME_01",
          uid: "WRITE_UID_01",
        },
        imageUrl: "https://play-lh.googleusercontent.com/ND3C5KdLnm1MahmIs5punpQHRlLRoBvlZe_qMOBkAjpaGxeIRX1P5kNAp_TXvgKoRUA",
        likeHistory: ["UID_01", "UID_02", "UID_03"],
        createdAt: new Date().getTime(),
      },
      {
        id: "ID_02",
        content: "CONTENT_02",
        writer: {
          name: "WRITE_NAME_02",
          uid: "WRITE_UID_02",
        },
        imageUrl: "https://play-lh.googleusercontent.com/ND3C5KdLnm1MahmIs5punpQHRlLRoBvlZe_qMOBkAjpaGxeIRX1P5kNAp_TXvgKoRUA",
        likeHistory: ["UID_01", "UID_02", "UID_03"],
        createdAt: new Date().getTime(),
      },
      {
        id: "ID_03",
        content: "CONTENT_03",
        writer: {
          name: "WRITE_NAME_03",
          uid: "WRITE_UID_03",
        },
        imageUrl: "https://play-lh.googleusercontent.com/ND3C5KdLnm1MahmIs5punpQHRlLRoBvlZe_qMOBkAjpaGxeIRX1P5kNAp_TXvgKoRUA",
        likeHistory: ["UID_01", "UID_02", "UID_03"],
        createdAt: new Date().getTime(),
      },
      {
        id: "ID_04",
        content: "CONTENT_04",
        writer: {
          name: "WRITE_NAME_04",
          uid: "WRITE_UID_04",
        },
        imageUrl: "https://play-lh.googleusercontent.com/ND3C5KdLnm1MahmIs5punpQHRlLRoBvlZe_qMOBkAjpaGxeIRX1P5kNAp_TXvgKoRUA",
        likeHistory: ["UID_01", "UID_03"],
        createdAt: new Date().getTime(),
      },
    ])
  );
};

// dispatch 타입 정의
export type TypeUserDispatch = ThunkDispatch<TypeRootReducer,undefined, TypeUserInfoActions>;

// 2.thunk action 에 대한 타입 정의
export type TypeUserThunkAction = ThunkAction<
  Promise<void>,
  TypeRootReducer,
  undefined,
  TypeUserInfoActions
>;

// 1.ACTION 에 대한 타입 정의
export type TypeUserInfoActions =
  | ReturnType<typeof setUserInfo>
  | ReturnType<typeof getMyFeedRequest>
  | ReturnType<typeof getMyFeedSuccess>
  | ReturnType<typeof getMyFeedFailure>;

