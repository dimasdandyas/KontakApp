import { combineReducers, createStore, applyMiddleware } from 'redux';
import ContactReducer from '../reducer/contact.reducer';
import createSagaMiddleware from 'redux-saga';
import { watchContact } from '../sagas/contact.saga';
import { composeWithDevTools } from 'redux-devtools-extension';

const sagaMiddleware = createSagaMiddleware() 

const store = createStore(combineReducers({
    ContactReducer
}), composeWithDevTools(applyMiddleware(sagaMiddleware)))

sagaMiddleware.run(watchContact)

export default store