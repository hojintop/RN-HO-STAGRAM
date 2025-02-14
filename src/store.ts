import { applyMiddleware, combineReducers, createStore } from "redux";
import { TypeUserInfoReducer, userInfoReducer } from "./reducers/userInfo";
import { feedListReducer, TypeFeedListReducer } from "./reducers/feedList";
import logger from "redux-logger";
import { configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  userInfo: userInfoReducer,
  feedList: feedListReducer,
});

// 스토어 생성
const store = configureStore({
    reducer: rootReducer,  // rootReducer 설정
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(logger),  // redux-logger 미들웨어 추가
  });

export type TypeRootReducer = {
  userInfo: TypeUserInfoReducer;
  feedList: TypeFeedListReducer;
};
export default store;
