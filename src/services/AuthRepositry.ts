
import { User } from '../model/User';
import { UserActions } from '../redux/action/UserAction';
import {Api} from './Api';
import {AsyncStorageService} from './AsyncStorage';


export class AuthRepositry {
  static login(data: {
    email: string;
    password: string;
    returnSecureToken: boolean;
  }) {
    return async dispatch => {
      try {
        dispatch(UserActions.LoginRequestAction());
        const user: User = await Api.login(data);
        dispatch(UserActions.LoginRequestSuccessAction(user));
        await AsyncStorageService.setUser({
          email: user.email,
          idToken: user.idToken,
        });
        return user;
      } catch (e) {
        console.log(e);
        dispatch(UserActions.UserErrorOccurred());
        return Promise.reject(e);
      }
    };
  }
  static updateUser(user) {
    return async dispatch => {
      try {
        dispatch(UserActions.UserUpdateAction(user));
        return;
      } catch (e) {
        return Promise.reject(e);
      }
    };
  }
  static logout() {
    return async dispatch => {
      await AsyncStorageService.clearUser();
      dispatch(UserActions.UserLogoutAction());
      return;
    };
  }
}
