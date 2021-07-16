import { combineReducers, createStore, applyMiddleware } from 'redux';
import ContactReducer from '../reducer/contact.reducer';
import createSagaMiddleware from 'redux-saga';
import { watchContact } from '../sagas/contact.saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import storage from '@react-native-async-storage/async-storage';

const sagaMiddleware = createSagaMiddleware()

const rootReducers = combineReducers({
    ContactReducer
})

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['ContactReducer']
}

const store = createStore(persistReducer(persistConfig, rootReducers),
    composeWithDevTools(applyMiddleware(sagaMiddleware)))

const persistor = persistStore(store)

sagaMiddleware.run(watchContact)

export { store, persistor }