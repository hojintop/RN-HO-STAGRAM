import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { sleep } from "../utils/sleep";
import { TypeRootReducer } from "../store";
import { UserInfo } from "../@types/UserInfo";
import { FeedInfo } from "../@types/FeedInfo";
import firebaseAuth from "@react-native-firebase/auth";
import database from "@react-native-firebase/database";

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

export const signIn =
  (idToken: string): TypeUserThunkAction =>
  async (dispatch) => {
    const credential = firebaseAuth.GoogleAuthProvider.credential(idToken);
    const result = await firebaseAuth().signInWithCredential(credential);

    const userDBRefKey = `/users/${result.user.uid}`;
    const userDB = await database().ref(userDBRefKey);
    const user = await userDB.once("value").then((snapshot) => {
      return snapshot.val();
    });

    const now = new Date().toISOString();
    if (user === null) {
      if (result.additionalUserInfo?.profile !== undefined) {
        await userDB.set({
          name: result.additionalUserInfo?.profile.name,
          profileImage: result.additionalUserInfo?.profile.picture,
          uid: result.user.uid,
          createAt: now,
          lastLoginAt: now,
        });
      }
    } else {
      await userDB.update({
        lastLoginAt: now,
      });
    }

    if (result.additionalUserInfo?.profile !== undefined) {
      dispatch(
        setUserInfo({
          name: result.additionalUserInfo.profile.name,
          profileImage: result.additionalUserInfo.profile.picture,
          uid: result.user.uid,
        })
      );
    }
  };

// thunk action // getState = redux 에 저장되어 있는 값
export const getMyFeedList =
  (): TypeUserThunkAction => async (dispatch, getState) => {
    dispatch(getMyFeedRequest());

    const lastFeedList = await database()
      .ref("/feed")
      .once("value")
      .then((snapshot) => snapshot.val());

    const result = Object.keys(lastFeedList)
      .map((key) => {
        return {
          ...lastFeedList[key],
          id: key,
          likeHistory: lastFeedList[key].likeHistory ?? [],
        };
      })
      .filter((item) => item.writer.uid === getState().userInfo.userInfo?.uid);

    dispatch(getMyFeedSuccess(result));
  };

// dispatch 타입 정의
export type TypeUserDispatch = ThunkDispatch<
  TypeRootReducer,
  undefined,
  TypeUserInfoActions
>;

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
