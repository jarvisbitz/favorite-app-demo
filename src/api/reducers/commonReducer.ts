import {SET_LOADER_START, SET_LOADER_COMPLETE} from '../constants';

// Define action types
interface SetLoaderStartAction {
  type: typeof SET_LOADER_START;
  payload: {status: boolean};
}

interface SetLoaderCompleteAction {
  type: typeof SET_LOADER_COMPLETE;
  payload: {status: boolean};
}

type ActionTypes = SetLoaderStartAction | SetLoaderCompleteAction;

interface CommonState {
  loading: boolean;
}

const initialState: CommonState = {
  loading: false,
};

export default function commonReducer(
  state = initialState,
  action: ActionTypes,
): CommonState {
  switch (action.type) {
    case SET_LOADER_START:
    case SET_LOADER_COMPLETE:
      return {
        ...state,
        loading: action.payload.status,
      };

    default:
      return state;
  }
}
