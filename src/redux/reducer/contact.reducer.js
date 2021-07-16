import {
    FETCH_GET_CONTACT, FETCH_GET_CONTACT_SUCCESS_TYPE, FETCH_GET_CONTACT_ERROR_TYPE,
    FETCH_ADD_CONTACT, FETCH_ADD_CONTACT_SUCCESS, FETCH_ADD_CONTACT_ERROR,
    FETCH_UPDATE_CONTACT, FETCH_UPDATE_CONTACT_SUCCESS, FETCH_UPDATE_CONTACT_ERROR,
    FETCH_REFRESH_CONTACT, FETCH_REFRESH_CONTACT_SUCCESS,
    FETCH_DELETE_CONTACT, FETCH_DELETE_CONTACT_SUCCESS, FETCH_DELETE_CONTACT_ERROR,
    FETCH_CLEAR_ERROR,
} from "../action/contact.action"

const initState = {
    data: [],
    dataRefresh: [],
    dataAdd: {},
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
        case FETCH_ADD_CONTACT:
            return {
                ...state, loading: true
            }
        case FETCH_ADD_CONTACT_SUCCESS:
            return {
                ...state, loading: false, dataAdd: action.dataAdd, error: undefined,
            }
        case FETCH_ADD_CONTACT_ERROR:
            return {
                ...state, loading: false, error: action.error
            }

        case FETCH_UPDATE_CONTACT:
            return {
                ...state, loading: true
            }
        case FETCH_UPDATE_CONTACT_SUCCESS:
            const contactUpdate = [...state.data]
            const contactPut = contactUpdate.map(item => {
                if (item.id === action.dataUpdate.updateContact.id) {
                    item = action.dataUpdate.updateContact
                }
                return item
            })
            return {
                ...state, data: contactPut, loading: false, error: undefined
            }
        case FETCH_UPDATE_CONTACT_ERROR:
            return {
                ...state, loading: false, error: action.error
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
            const newState = state.data(item => item.id !== action.dataDelete.id)
            return {
                ...state, loading: false, dataDelete: newState, error: undefined,
            }
        case FETCH_DELETE_CONTACT_ERROR:
            return {
                ...state, loading: false, error: action.error
            }
        case FETCH_CLEAR_ERROR:
            return {
                ...state, error: undefined
            }
        default:
            return state
    }
}

export default ContactReducer