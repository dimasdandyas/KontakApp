import { combineReducers, createStore } from 'redux';
import ContactReducer from '../reducer/contact.reducer';

const store = createStore(combineReducers({
    contactReducer : ContactReducer
}))

export default store