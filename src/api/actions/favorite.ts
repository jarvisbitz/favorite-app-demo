import {
  ADD_FAVORITE,
  ADD_FAVORITE_ERROR,
  ADD_FAVORITE_SUCCESS,
  REMOVE_FAVORITE,
  REMOVE_FAVORITE_ERROR,
  REMOVE_FAVORITE_SUCCESS,
} from '../constants';

export function addFavorite(session: any, resolve: Function, reject: Function) {
  return {
    type: ADD_FAVORITE as typeof ADD_FAVORITE,
    payload: session,
    resolve,
    reject,
  };
}

export const addFavoriteSuccess = (data: any) => ({
  type: ADD_FAVORITE_SUCCESS as typeof ADD_FAVORITE_SUCCESS,
  payload: data,
});

export const addFavoriteError = (error: any) => ({
  type: ADD_FAVORITE_ERROR as typeof ADD_FAVORITE_ERROR,
  payload: error,
});

export function removeFavorite(
  session: any,
  resolve: Function,
  reject: Function,
) {
  return {
    type: REMOVE_FAVORITE as typeof REMOVE_FAVORITE,
    payload: session,
    resolve,
    reject,
  };
}

export const removeFavoriteSuccess = (data: any) => ({
  type: REMOVE_FAVORITE_SUCCESS as typeof REMOVE_FAVORITE_SUCCESS,
  payload: data,
});

export const removeFavoriteError = (error: any) => ({
  type: REMOVE_FAVORITE_ERROR as typeof REMOVE_FAVORITE_ERROR,
  payload: error,
});
