import {put, takeLatest} from 'redux-saga/effects';
import {GET_LOGIN} from '../../constants';
import {
  getLoginError,
  getLoginSuccess,
  setLoaderComplete,
  setLoaderStart,
} from '../../actions';

function* getLoginAction(action: {
  payload: any;
  resolve?: Function;
  reject?: Function;
}): Generator<any, void, any> {
  const {payload, resolve, reject} = action;
  try {
    yield put(setLoaderStart());
    if (payload.email !== 'jetdevs@123' && payload.password !== 'jetdevs@123') {
      const error = {
        message: 'Invalid credentials, please verify and try again',
      };
      yield put(setLoaderComplete());
      yield put(getLoginError(error));
      if (reject) {
        reject(error);
      }
      return;
    }

    yield new Promise(resolve => setTimeout(resolve, 1000));

    const fakeApiResponse = {
      status: true,
      data: {
        token: '1234567890',
      },
    };

    yield put(setLoaderComplete());
    yield put(getLoginSuccess(fakeApiResponse.data));
    if (resolve) {
      resolve(fakeApiResponse.data);
    }
  } catch (e) {
    yield put(setLoaderComplete());
    yield put(getLoginError(e));
    if (reject) {
      reject(e);
    }
  }
}

export function* getLoginWatcher() {
  yield takeLatest(GET_LOGIN, getLoginAction);
}
