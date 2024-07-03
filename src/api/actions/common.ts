import {SET_LOADER_START, SET_LOADER_COMPLETE} from '../constants';

export function setLoaderStart() {
  return {
    type: SET_LOADER_START as typeof SET_LOADER_START,
    payload: {
      status: true,
    },
  };
}

export function setLoaderComplete() {
  return {
    type: SET_LOADER_COMPLETE as typeof SET_LOADER_COMPLETE,
    payload: {
      status: false,
    },
  };
}
