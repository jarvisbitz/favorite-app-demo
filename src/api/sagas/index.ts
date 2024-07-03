import {all} from 'redux-saga/effects';
import {getLoginWatcher} from './auth/login';
import {getListWatcher} from './dashboard/list';
import {getFavoriteAddWatcher} from './favorite/add';
import {getFavoriteRemoveWatcher} from './favorite/remove';

export default function* rootSaga() {
  yield all([
    getLoginWatcher(),
    getListWatcher(),
    getFavoriteAddWatcher(),
    getFavoriteRemoveWatcher(),
  ]);
}
