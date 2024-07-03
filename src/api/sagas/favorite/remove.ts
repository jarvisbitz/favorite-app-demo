import {put, takeLatest} from 'redux-saga/effects';
import {REMOVE_FAVORITE} from '../../constants';
import {
  removeFavoriteError,
  removeFavoriteSuccess,
  setLoaderComplete,
  setLoaderStart,
} from '../../actions';

function* getFavoriteRemoveAction(action: {
  payload: any;
  resolve?: Function;
  reject?: Function;
}): Generator<any, void, any> {
  const {payload, resolve, reject} = action;
  try {
    yield put(setLoaderStart());
    yield put(setLoaderComplete());
    yield put(removeFavoriteSuccess(payload));
    if (resolve) {
      resolve(payload);
    }
  } catch (e) {
    yield put(setLoaderComplete());
    yield put(removeFavoriteError(e));
    if (reject) {
      reject(e);
    }
  }
}

export function* getFavoriteRemoveWatcher() {
  yield takeLatest(REMOVE_FAVORITE, getFavoriteRemoveAction);
}
