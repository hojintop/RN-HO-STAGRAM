import { FeedInfo } from "../@types/FeedInfo";
import { TypeRootReducer } from "../store";
import { sleep } from "../utils/sleep";
import { ThunkAction, ThunkDispatch } from "redux-thunk";

export const GET_FEED_LIST_REQUEST = "GET_FEED_LIST_REQUEST" as const;
export const GET_FEED_LIST_SUCCESS = "GET_FEED_LIST_SUCCESS" as const;
export const GET_FEED_LIST_FAILURE = "GET_FEED_LIST_FAILURE" as const;

export const getFeedListRequest = () => {
  return {
    type: GET_FEED_LIST_REQUEST,
  };
};

export const getFeedListSuccess = (list: FeedInfo[]) => {
  return {
    type: GET_FEED_LIST_SUCCESS,
    list,
  };
};

export const getFeedListFailure = () => {
  return {
    type: GET_FEED_LIST_FAILURE,
  };
};


// thunk action
export const getFeedList = ():TypeFeedListThunkAction => async (dispatch) => {
  dispatch(getFeedListRequest());

  await sleep(500);

  dispatch(
    getFeedListSuccess([
      {
        id: "ID_01",
        content: "CONTENT_01",
        writer: {
          name: "WRITE_NAME_01",
          uid: "WRITE_UID_01",
        },
        imageUrl: "IMAGE_URI_01",
        likeHistory: ["UID_01", "UID_02", "UID_03"],
        createdAt: new Date().getTime(),
      },
      {
        id: "ID_01",
        content: "CONTENT_01",
        writer: {
          name: "WRITE_NAME_01",
          uid: "WRITE_UID_01",
        },
        imageUrl: "IMAGE_URI_01",
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
        imageUrl: "IMAGE_URI_02",
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
        imageUrl: "IMAGE_URI_03",
        likeHistory: ["UID_01", "UID_02", "UID_03"],
        createdAt: new Date().getTime(),
      }
    ])
  );
};

// 2.thunk action 에 대한 타입 정의
export type TypeFeedListThunkAction = ThunkAction<void, TypeRootReducer, undefined, TypeFeedListActions>;

// 1.ACTION 에 대한 타입 정의
export type TypeFeedListActions = 
| ReturnType <typeof getFeedListRequest>
| ReturnType <typeof getFeedListSuccess>
| ReturnType <typeof getFeedListFailure>