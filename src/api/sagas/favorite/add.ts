import {put, takeLatest} from 'redux-saga/effects';
import {ADD_FAVORITE} from '../../constants';
import {
  addFavoriteError,
  addFavoriteSuccess,
  setLoaderComplete,
  setLoaderStart,
} from '../../actions';

function* getFavoriteAddAction(action: {
  payload: any;
  resolve?: Function;
  reject?: Function;
}): Generator<any, void, any> {
  const {payload, resolve, reject} = action;
  try {
    yield put(setLoaderStart());
    yield put(setLoaderComplete());
    yield put(addFavoriteSuccess(payload));
    if (resolve) {
      resolve(payload);
    }
  } catch (e) {
    yield put(setLoaderComplete());
    yield put(addFavoriteError(e));
    if (reject) {
      reject(e);
    }
  }
}

export function* getFavoriteAddWatcher() {
  yield takeLatest(ADD_FAVORITE, getFavoriteAddAction);
}
