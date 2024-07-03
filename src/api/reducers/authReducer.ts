import {GET_LOGIN_SUCCESS, LOGOUT} from '../constants';

// Define action types
interface LoginSuccessAction {
  type: typeof GET_LOGIN_SUCCESS;
  payload: any;
}

interface LogoutAction {
  type: typeof LOGOUT;
}

type ActionTypes = LoginSuccessAction | LogoutAction;

interface AuthState {
  token: string;
}

const initialState: AuthState = {
  token: '',
};

export default function authReducer(
  state: AuthState = initialState,
  action: ActionTypes,
): AuthState {
  switch (action.type) {
    case GET_LOGIN_SUCCESS:
      return {
        ...state,
        token: (action as LoginSuccessAction).payload.token,
      };

    case LOGOUT:
      return {
        ...state,
        token: initialState.token,
      };

    default:
      return state;
  }
}
