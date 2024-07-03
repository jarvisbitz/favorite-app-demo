import {applyMiddleware, createStore} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import AsyncStorage from '@react-native-async-storage/async-storage';
import rootSaga from '../sagas';
import rootReducer from '../reducers';

const persistedReducer = persistReducer(
  {
    key: 'primary',
    storage: AsyncStorage,
    whitelist: ['auth', 'favorite'],
  },
  rootReducer,
);

const sagaMiddleware = createSagaMiddleware();
const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);
const persistor = persistStore(store);

export {store, persistor};
