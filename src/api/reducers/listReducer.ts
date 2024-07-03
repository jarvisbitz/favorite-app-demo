import {GET_LIST_SUCCESS, LOGOUT} from '../constants';

// Define action types
interface ListSuccessAction {
  type: typeof GET_LIST_SUCCESS;
  payload: any;
}

type ActionTypes = ListSuccessAction;

interface ListState {
  list: Array<any>[];
}

const initialState: ListState = {
  list: [],
};

export default function listReducer(
  state: ListState = initialState,
  action: ActionTypes,
): ListState {
  switch (action.type) {
    case GET_LIST_SUCCESS:
      return {
        ...state,
        list: (action as ListSuccessAction).payload.list,
      };

    default:
      return state;
  }
}
