import {GET_LIST, GET_LIST_ERROR, GET_LIST_SUCCESS} from '../constants';

export function getList(session: any, resolve: Function, reject: Function) {
  return {
    type: GET_LIST as typeof GET_LIST,
    payload: session,
    resolve,
    reject,
  };
}

export const getListSuccess = (data: any) => ({
  type: GET_LIST_SUCCESS as typeof GET_LIST_SUCCESS,
  payload: data,
});

export const getListError = (error: any) => ({
  type: GET_LIST_ERROR as typeof GET_LIST_ERROR,
  payload: error,
});
