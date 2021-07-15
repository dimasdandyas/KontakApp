import {
    FETCH_GET_CONTACT, FETCH_GET_CONTACT_SUCCESS_TYPE, FETCH_GET_CONTACT_ERROR_TYPE,
    FETCH_UPDATE_CONTACT, FETCH_UPDATE_CONTACT_SUCCESS, FETCH_UPDATE_CONTACT_ERROR,
    FETCH_REFRESH_CONTACT, FETCH_REFRESH_CONTACT_SUCCESS,
    FETCH_DELETE_CONTACT, FETCH_DELETE_CONTACT_SUCCESS, FETCH_DELETE_CONTACT_ERROR,
} from "../action/contact.action"

const initState = {
    data: [],
    dataRefresh: [],
    dataDelete: {},
    dataUpdate: {},
    loading: false,
    error: undefined,
}

const ContactReducer = (state = initState, action) => {
    switch (action.type) {
        case FETCH_GET_CONTACT:
            return {
                ...state, loading: true
            }
        case FETCH_GET_CONTACT_SUCCESS_TYPE:
            return {
                ...state, loading: false, data: action.data, error: undefined,
            }
        case FETCH_GET_CONTACT_ERROR_TYPE:
            return {
                ...state, loading: false, error: action.error
            }

        case FETCH_UPDATE_CONTACT:
            return {
                ...state, loading: true
            }
        case FETCH_UPDATE_CONTACT_SUCCESS:
            const contactPut = state.findIndex(item => item.id == action.dataUpdate.id)
            let updateState = [...state]
            updateState[contactPut] = action.dataUpdate
            return {
                ...state, dataUpdate: updateState, loading: false, error: undefined
            }
        case FETCH_UPDATE_CONTACT_ERROR:
            return {
                ...state, error: action.error
            }

        case FETCH_REFRESH_CONTACT:
            return {
                ...state, loading: true
            }
        case FETCH_REFRESH_CONTACT_SUCCESS:
            return {
                ...state, loading: false, dataRefresh: action.dataRefresh, error: undefined,
            }

        case FETCH_DELETE_CONTACT:
            return {
                ...state, loading: true
            }
        case FETCH_DELETE_CONTACT_SUCCESS:
            const newState = state.filter(item => item.id !== action.dataDelete.id)
            return {
                ...state, loading: false, dataDelete: newState, error: undefined,
            }
        case FETCH_DELETE_CONTACT_ERROR:
            return {
                ...state, loading: false, error: action.error
            }
            
        default:
            return state
    }
}

export default ContactReducer