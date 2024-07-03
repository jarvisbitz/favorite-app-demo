import {Action, combineReducers, Reducer} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authReducer from './authReducer';
import commonReducer from './commonReducer';
import listReducer from './listReducer';
import favoriteReducer from './favoriteReducer';

// Define RootState type for the combined reducers
type RootState = {
  common: ReturnType<typeof commonReducer>;
  auth: ReturnType<typeof authReducer>;
  list: ReturnType<typeof listReducer>;
  favorite: ReturnType<typeof favoriteReducer>;
};

// Define root reducer using combineReducers with RootState
const rootReducer: Reducer<RootState, Action> = combineReducers({
  common: commonReducer,
  auth: authReducer,
  list: listReducer,
  favorite: favoriteReducer,
});

// Define appReducer using rootReducer and handling logout action
const appReducer: Reducer<RootState, Action> = (state, action) => {
  if (action.type === 'LOGOUT') {
    // Clear AsyncStorage when logging out
    clearStorage();
    // Reset the state to the initial state
    state = undefined;
  }
  return rootReducer(state, action);
};

// Define clearStorage function with proper types
const clearStorage = async (): Promise<void> => {
  const keys = await AsyncStorage.getAllKeys();
  await AsyncStorage.multiRemove(keys);
};

export default appReducer;
