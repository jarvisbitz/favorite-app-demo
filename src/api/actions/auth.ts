import {GET_LOGIN, GET_LOGIN_ERROR, GET_LOGIN_SUCCESS} from '../constants';

export function getLogin(session: any, resolve: Function, reject: Function) {
  return {
    type: GET_LOGIN as typeof GET_LOGIN,
    payload: session,
    resolve,
    reject,
  };
}

export const getLoginSuccess = (data: any) => ({
  type: GET_LOGIN_SUCCESS as typeof GET_LOGIN_SUCCESS,
  payload: data,
});

export const getLoginError = (error: any) => ({
  type: GET_LOGIN_ERROR as typeof GET_LOGIN_ERROR,
  payload: error,
});
