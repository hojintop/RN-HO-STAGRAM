import { FeedInfo } from "../@types/FeedInfo";
import { CREATE_FEED_SUCCESS, FAVORITE_FEED_SUCCESS, GET_FEED_LIST_FAILURE, GET_FEED_LIST_REQUEST, GET_FEED_LIST_SUCCESS, TypeFeedListActions } from "../actions/feed";

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
    case GET_FEED_LIST_REQUEST:
      return state;
    case GET_FEED_LIST_SUCCESS:
      return {
        ...state,
        list: action.list,
      };
    case GET_FEED_LIST_FAILURE:
      return state;
      
    case CREATE_FEED_SUCCESS:
        return{
            ...state,
            list:state.list.concat([action.item]),
        }
    case FAVORITE_FEED_SUCCESS:
        return{
            ...state,
            // list: state.list.map((item)=>{
            //     if(item.id === action.feedId){
            //         return item
            //     }
            // })
        }
    default:
      return state;
  }
};