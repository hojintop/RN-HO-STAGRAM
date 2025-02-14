import { FeedInfo } from "../@types/FeedInfo";
import { UserInfo } from "../@types/UserInfo";
import { TypeUserInfoActions } from "../actions/user";

// 사용자 정보 초기 상태 설정
export type TypeUserInfoReducer = {
  userInfo: UserInfo | null;
  myFeedList: FeedInfo[];
};

const defaultUserInfoState: TypeUserInfoReducer = {
  userInfo: null,
  myFeedList: [],
};

// 리듀서
export const userInfoReducer = (
  state: TypeUserInfoReducer = defaultUserInfoState,
  action: TypeUserInfoActions
): TypeUserInfoReducer => {
  switch (action.type) {
    case "SET_USER_INFO":
      return {
        ...state,
        userInfo: action.user,
      };
    
    case "GET_MY_FEED_SUCCESS" :
        return{
            ...state,
            myFeedList: action.list
        }
    default:
      return state;
  }
};