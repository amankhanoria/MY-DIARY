// import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
// import {DiaryReducer, DiaryReducerState} from '../redux/reducers/DiaryReducers';
// import {UserReducer, UserReducerState} from '../redux/reducers/UserReducers';
// import thunk from 'redux-thunk';
// export interface RootReducerState {
//   diaryReducer: DiaryReducerState;
//   userReducer: UserReducerState;
// }
// export const rootReducer = combineReducers({
//   diaryReducer: DiaryReducer,
//   userReducer: UserReducer,
// });
// let composeEnhancers = compose;

// if (__DEV__) {
//   composeEnhancers =
//     (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// }
// export default createStore(
//   rootReducer,
//   composeEnhancers(applyMiddleware(thunk)),
// );
import {DevEnvironment} from './dev.env';
import {ProdEnvironment} from './prod.env';

export interface Environment {
  base_api_url: string;
  auth_url : string;
}
export function getEnvVariable(): Environment {
  if (__DEV__) {
    return DevEnvironment;
  } else {
    return ProdEnvironment;
  }
}
