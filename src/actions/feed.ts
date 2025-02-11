import { FeedInfo } from "../@types/FeedInfo";
import { TypeRootReducer } from "../store";
import { sleep } from "../utils/sleep";
import { ThunkAction, ThunkDispatch } from "redux-thunk";

export const GET_FEED_LIST_REQUEST = "GET_FEED_LIST_REQUEST" as const;
export const GET_FEED_LIST_SUCCESS = "GET_FEED_LIST_SUCCESS" as const;
export const GET_FEED_LIST_FAILURE = "GET_FEED_LIST_FAILURE" as const;

export const CREATE_FEED_REQUEST = "CREATE_FEED_REQUEST" as const;
export const CREATE_FEED_SUCCESS = "CREATE_FEED_SUCCESS" as const;
export const CREATE_FEED_FAILURE = "CREATE_FEED_FAILURE" as const;

export const FAVORITE_FEED_REQUEST = "FAVORITE_FEED_REQUEST" as const;
export const FAVORITE_FEED_SUCCESS = "FAVORITE_FEED_SUCCESS" as const;
export const FAVORITE_FEED_FAILURE = "FAVORITE_FEED_FAILURE" as const;

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


export const createFeedRequest = () => {
    return{
        type: CREATE_FEED_REQUEST
    }
}

export const createFeedSuccess = (item: FeedInfo) => {
    return{
        type: CREATE_FEED_SUCCESS,
        item
    }
}

export const createFeedFailure = () => {
    return{
        type: CREATE_FEED_FAILURE
    }
}

//thunk action
export const createFeed = (item:Omit<FeedInfo, "id"|"writer"|"createdAt"|"likeHistory">):TypeFeedListThunkAction => async (dispatch, getState) => {
    const createdAt = new Date().getTime();
    const userInfo = getState().userInfo.userInfo;

    dispatch(createFeedRequest());

    await sleep(500);

    dispatch(createFeedSuccess({
        id: "ID-010",
        content: item.content,
        writer: {
            name: userInfo?.name ?? "Unknown",
            uid: userInfo?.uid ?? "Unknown",
        },
        imageUrl: item.imageUrl,
        likeHistory: [],
        createdAt: createdAt,
    }))
}

export const favoriteFeedRequest = () => {
    return{
        type: FAVORITE_FEED_REQUEST
    }
}

export const favoriteFeedSuccess = (feedId: FeedInfo["id"]) => {
    return{
        type: FAVORITE_FEED_SUCCESS,
        feedId
    }
}

export const favoriteFeedFailure = (feedId: FeedInfo["id"]) => {
    return{
        type: FAVORITE_FEED_FAILURE
    }
}

// thunk action
export const favoriteFeed = (item:FeedInfo):TypeFeedListThunkAction => async (dispatch) => {
    dispatch(favoriteFeedRequest());

    sleep(500);

    dispatch(favoriteFeedSuccess(item.id));
}

// 2.thunk action 에 대한 타입 정의
export type TypeFeedListThunkAction = ThunkAction<void, TypeRootReducer, undefined, TypeFeedListActions>;

// 1.ACTION 에 대한 타입 정의
export type TypeFeedListActions = 
| ReturnType <typeof getFeedListRequest>
| ReturnType <typeof getFeedListSuccess>
| ReturnType <typeof getFeedListFailure>
| ReturnType <typeof createFeedRequest>
| ReturnType <typeof createFeedSuccess>
| ReturnType <typeof createFeedFailure>
| ReturnType <typeof favoriteFeedRequest>
| ReturnType <typeof favoriteFeedSuccess>
| ReturnType <typeof favoriteFeedFailure>