import {ADD_FAVORITE_SUCCESS, REMOVE_FAVORITE_SUCCESS} from '../constants';

// Define action types
interface AddFavoriteSuccessAction {
  type: typeof ADD_FAVORITE_SUCCESS;
  payload: any;
}

interface RemoveFavoriteSuccessAction {
  type: typeof REMOVE_FAVORITE_SUCCESS;
  payload: any;
}

type ActionTypes = AddFavoriteSuccessAction | RemoveFavoriteSuccessAction;

interface FavoriteState {
  favorites: any;
}

const initialState: FavoriteState = {
  favorites: [],
};

export default function favoriteReducer(
  state: FavoriteState = initialState,
  action: ActionTypes,
): FavoriteState {
  switch (action.type) {
    case ADD_FAVORITE_SUCCESS:
      const existingItem = state.favorites.find(
        (item: any) => item.login.md5 === action.payload.login.md5,
      );

      if (existingItem) {
        // If the item already exists, update its favorite property if it was false
        if (!existingItem.favorite) {
          return {
            ...state,
            favorites: state.favorites.map((item: any) =>
              item.login.md5 === action.payload.login.md5
                ? {...item, favorite: true}
                : item,
            ),
          };
        } else {
          // If favorite is already true, return state as it is
          return state;
        }
      } else {
        // If the item doesn't exist, add it to favorites
        return {
          ...state,
          favorites: [...state.favorites, action.payload],
        };
      }

    case REMOVE_FAVORITE_SUCCESS:
      return {
        ...state,
        favorites: state.favorites.map((item: any) =>
          item.login.md5 === action.payload.login.md5
            ? {...item, favorite: false}
            : item,
        ),
      };

    default:
      return state;
  }
}
