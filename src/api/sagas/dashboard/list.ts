import {call, put, takeLatest} from 'redux-saga/effects';
import {AxiosResponse} from 'axios';
import {GET_LIST} from '../../constants';
import {
  getListError,
  getListSuccess,
  setLoaderComplete,
  setLoaderStart,
} from '../../actions';
import {instance} from '../../index';
import API_URL from '../../api.config';

async function getListingApi(data: any): Promise<AxiosResponse> {
  return instance.request({
    method: 'get',
    url: API_URL.listing,
    params: data,
  });
}

function* getListingAction(action: {
  payload: any;
  resolve?: Function;
  reject?: Function;
}): Generator<any, void, AxiosResponse> {
  const {payload, resolve, reject} = action;
  try {
    yield put(setLoaderStart());
    const response: AxiosResponse = yield call(getListingApi, payload);
    yield put(setLoaderComplete());
    if (response.data) {
      yield put(getListSuccess(response.data.results));
      if (resolve) {
        resolve(response.data.results);
      }
    } else {
      yield put(getListError(response));
      if (reject) {
        reject(response);
      }
    }
  } catch (e) {
    yield put(setLoaderComplete());
    yield put(getListError(e));
    if (reject) {
      reject(e);
    }
  }
}

export function* getListWatcher() {
  yield takeLatest(GET_LIST, getListingAction);
}
