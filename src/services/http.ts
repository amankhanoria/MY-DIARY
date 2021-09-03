import _axios, {AxiosRequestConfig} from 'axios';

import { getEnvVariable } from '../envnironment';
import {ToastAndroid} from 'react-native';

import {AsyncStorageService} from './AsyncStorage';
import { User } from '../model/User';
export class Http {
  private static getToken = async () => {
    const user: User = await AsyncStorageService.getUser();
    return user ? user.idToken : null;
  };
  private static axios = _axios.create({
    baseURL: getEnvVariable().base_api_url,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  static async get(url, config?: AxiosRequestConfig) {
    try {
      const token = await Http.getToken();
      const latestUrl = token ? url+'?auth=' + token: url;
      const response = await Http.axios.get(latestUrl, config);
      if (response) {
        return response.data;
      }
    } catch (e) {
      Http.handleErrors(e);
      return Promise.reject(e);
    }
  }
  static async post(url, body?: object, config?: AxiosRequestConfig) {
    try {
      const token = await Http.getToken();
      const latestUrl = token
        ? url +
          '?auth=' + 
          token
        : url;
      const response = await Http.axios.post(latestUrl, body, config);
      if (response) {
        return response.data;
      }
    } catch (e) {
      Http.handleErrors(e);
      return Promise.reject(e);
    }
  }
  static async patch(url, body?: object, config?: AxiosRequestConfig) {
    try {
      const token = await Http.getToken();
      const latestUrl = token
        ? url +
          '?auth=' +
          token
        : url;
      const response = await Http.axios.patch(latestUrl, body, config);
      if (response) {
        return response.data;
      }
    } catch (e) {
      Http.handleErrors(e);
      return Promise.reject(e);
    }
  }
  static async delete(url, config?: AxiosRequestConfig) {
    try {
      const token = await Http.getToken();
      const latestUrl = token
        ? url +
          '?auth=' +
          token
        : url;
      const response = await Http.axios.delete(latestUrl, config);
      if (response) {
        return response.data;
      }
    } catch (e) {
      Http.handleErrors(e);
      return Promise.reject(e);
    }
  }
  private static handleErrors(error) {
    if (error.response) {
      const message = error.response.data.message;
      const errorMessage = message
        ? message
        : 'Something Went Wrong. Please Try Again';
      ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
    } else {
      ToastAndroid.show(
        'Something Went Wrong.Please Try Again',
        ToastAndroid.SHORT,
      );
    }
  }
}
