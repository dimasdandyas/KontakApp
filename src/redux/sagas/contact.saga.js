import { out } from 'react-native/Libraries/Animated/Easing'
import { takeLatest, call, put, take } from 'redux-saga/effects'
import { getContacts, postContact, putContact, deleteContact } from '../../services/contact.services'
import { FETCH_GET_CONTACT, fetchActionGetSuccess, fetchActionGetError,
    FETCH_UPDATE_CONTACT, fetchActionUpdateSuccess, fetchActionUpdateError,
    FETCH_REFRESH_CONTACT, fetchActionRefreshSuccess,
    FETCH_DELETE_CONTACT, fetchActionDeleteSuccess, fetchActionDeleteError, fetchActionDelete,
     } from '../action/contact.action'

function* fetchGetContact() {
    try {
        const getContact = yield call(getContacts)
        yield put(fetchActionGetSuccess(getContact.data))
    } catch (error) {
        yield put(fetchActionGetError(error.data.message))
    }
}

function* fetchUpdateContact(updateContact, id) {
    try {
        const updateCont = yield call(putContact, updateContact, id)
        yield put(fetchActionUpdateSuccess(updateCont.dataUpdate))
    } catch (error) {
        yield put(fetchActionUpdateError(error.message))
    }
}

function* fetchRefreshContact() {
    try {
        yield put(fetchActionRefreshSuccess())
    } catch (error) {
        yield put(fetchActionGetError(error))
    }
}

function* fetchDeleteContact(id) {
    try {
        const delContact = yield call(deleteContact, id)
        yield put(fetchActionDeleteSuccess(delContact.dataDelete))
    } catch(error) {
        yield put(fetchActionDeleteError(error.message))
    }
}

function* watchContact() {
    yield takeLatest(FETCH_GET_CONTACT, fetchGetContact)
    yield takeLatest(FETCH_REFRESH_CONTACT, fetchRefreshContact)
    yield takeLatest(FETCH_UPDATE_CONTACT, action => fetchUpdateContact(action.dataUpdate.updateContact, action.dataUpdate.id))    
    yield takeLatest(FETCH_DELETE_CONTACT, action => fetchDeleteContact(action.dataDelete))
}

export { watchContact }