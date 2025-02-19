import { FeedInfo } from "../@types/FeedInfo";
import { TypeRootReducer } from "../store";
import { sleep } from "../utils/sleep";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import database, { keepSynced } from "@react-native-firebase/database";

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
export const getFeedList = (): TypeFeedListThunkAction => async (dispatch) => {
  dispatch(getFeedListRequest());

  const lastFeedList = await database()
    .ref("/feed")
    .once("value")
    .then((snapshot) => snapshot.val());

  const result = Object.keys(lastFeedList).map((key) => {
    return {
      ...lastFeedList[key],
      id: key,
      likeHistory: lastFeedList[key].likeHistory ?? [],
    };
  });

  dispatch(getFeedListSuccess(result));
};

export const createFeedRequest = () => {
  return {
    type: CREATE_FEED_REQUEST,
  };
};

export const createFeedSuccess = (item: FeedInfo) => {
  return {
    type: CREATE_FEED_SUCCESS,
    item,
  };
};

export const createFeedFailure = () => {
  return {
    type: CREATE_FEED_FAILURE,
  };
};

//thunk action
export const createFeed =
  (
    feedItem: Omit<FeedInfo, "id" | "writer" | "createdAt" | "likeHistory">
  ): TypeFeedListThunkAction =>
  async (dispatch, getState) => {
    const createdAt = new Date().toISOString();
    const userInfo = getState().userInfo.userInfo;

    dispatch(createFeedRequest());

    await sleep(500);

    // 서버 파일 업로드(Firebase storage 유료화 관련하여 이슈...우선 패스
    // 데이터만 우선 저장
    const feedDB = await database().ref("/feed");
    const saveItem: Omit<FeedInfo, "id"> = {
      content: feedItem.content,
      writer: {
        name: userInfo?.name ?? "Unknown",
        uid: userInfo?.uid ?? "Unknown",
      },
      imageUrl: feedItem.imageUrl,
      likeHistory: [],
      createdAt: createdAt,
    };

    await feedDB.push().set({
      ...saveItem,
    });

    const lastFeedList = await feedDB
      .once("value")
      .then((snapshot) => snapshot.val());

    Object.keys(lastFeedList).forEach((key) => {
      const item = lastFeedList[key];

      if (item.createdAt === createdAt && item.imageUrl === feedItem.imageUrl) {
        console.log(1234);
        dispatch(
          createFeedSuccess({
            id: key,
            content: item.content,
            writer: {
              name: item.name,
              uid: item.uid,
            },
            imageUrl: item.imageUrl,
            likeHistory: item.likeHistory ?? [],
            createdAt: item.createAt,
          })
        );
      }
    });

    // dispatch(createFeedSuccess({
    //     id: "ID-010",
    //     content: item.content,
    //     writer: {
    //         name: userInfo?.name ?? "Unknown",
    //         uid: userInfo?.uid ?? "Unknown",
    //     },
    //     imageUrl: item.imageUrl,
    //     likeHistory: [],
    //     createdAt: createdAt,
    // }))
  };

export const favoriteFeedRequest = () => {
  return {
    type: FAVORITE_FEED_REQUEST,
  };
};

export const favoriteFeedSuccess = (
  feedId: FeedInfo["id"],
  myId: string,
  action: "add" | "del"
) => {
  return {
    type: FAVORITE_FEED_SUCCESS,
    feedId,
    myId,
    action,
  };
};

export const favoriteFeedFailure = () => {
  return {
    type: FAVORITE_FEED_FAILURE,
  };
};

// thunk action
export const favoriteFeed =
  (item: FeedInfo): TypeFeedListThunkAction =>
  async (dispatch, getState) => {
    dispatch(favoriteFeedRequest());

    const myId = getState().userInfo.userInfo?.uid || null;

    if (myId === null) {
      dispatch(favoriteFeedFailure());
      return;
    }

    const feedDB = database().ref(`/feed/${item.id}`);
    const feedItem = (await feedDB
      .once("value")
      .then((snapshot) => snapshot.val())) as FeedInfo;

    if (typeof feedItem.likeHistory === "undefined") {
      await feedDB.update({
        likeHistory: [myId],
      });
      dispatch(favoriteFeedSuccess(item.id, myId, "add"));
    } else {
      const hasMyId =
        feedItem.likeHistory.filter((likeUserId) => likeUserId === myId)
          .length > 0;

      if (hasMyId) {
        feedDB.update({
          likeHistory: feedItem.likeHistory.filter(
            (likeUserId) => likeUserId !== myId
          ),
        });
        dispatch(favoriteFeedSuccess(item.id, myId, "del"));
      } else {
        await feedDB.update({
          likeHistory: feedItem.likeHistory.concat(myId),
        });
        dispatch(favoriteFeedSuccess(item.id, myId, "add"));
      }
    }

    
    // sleep(500);

    // // 현재 좋아요를 누른 사용자 항목에 내 아이디가 있다면 제외시키고 없다면 추가
    // const hasMyId =
    //   item.likeHistory.filter((likeUserId) => likeUserId === myId).length > 0;
    // if (hasMyId) {
    //   dispatch(favoriteFeedSuccess(item.id, myId, "del"));
    // } else {
    //   dispatch(favoriteFeedSuccess(item.id, myId, "add"));
    // }
  };

// dispatch 타입 정의
export type TypeFeedListDispatch = ThunkDispatch<
  TypeRootReducer,
  undefined,
  TypeFeedListActions
>;

// 2.thunk action 에 대한 타입 정의
export type TypeFeedListThunkAction = ThunkAction<
  void,
  TypeRootReducer,
  undefined,
  TypeFeedListActions
>;

// 1.ACTION 에 대한 타입 정의
export type TypeFeedListActions =
  | ReturnType<typeof getFeedListRequest>
  | ReturnType<typeof getFeedListSuccess>
  | ReturnType<typeof getFeedListFailure>
  | ReturnType<typeof createFeedRequest>
  | ReturnType<typeof createFeedSuccess>
  | ReturnType<typeof createFeedFailure>
  | ReturnType<typeof favoriteFeedRequest>
  | ReturnType<typeof favoriteFeedSuccess>
  | ReturnType<typeof favoriteFeedFailure>;
