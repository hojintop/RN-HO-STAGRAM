import { FeedInfo } from "../@types/FeedInfo";
import { TypeFeedListActions } from "../actions/feed";

// 피드 리스트 초기 상태 설정
export type TypeFeedListReducer = {
  list: FeedInfo[];
};

const defaultFeedListState: TypeFeedListReducer = {
  list: [],
};

// 리듀서
export const feedListReducer = (
  state: TypeFeedListReducer = defaultFeedListState,
  action: TypeFeedListActions
): TypeFeedListReducer => {
  switch (action.type) {
    case "GET_FEED_LIST_REQUEST":
      return state;
    case "GET_FEED_LIST_SUCCESS":
      return {
        ...state,
        list: action.list,
      };
    case "GET_FEED_LIST_FAILURE":
      return state;
    default:
      return state;
  }
};