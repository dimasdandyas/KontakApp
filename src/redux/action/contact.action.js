export const FETCH_GET_CONTACT = "fetch_get_contact"
export const FETCH_GET_CONTACT_SUCCESS_TYPE = "fetch_get_contact_success"
export const FETCH_GET_CONTACT_ERROR_TYPE = "fetch_get_contact_error"

export const FETCH_UPDATE_CONTACT = "fetch_update_contact"
export const FETCH_UPDATE_CONTACT_SUCCESS = "fetch_update_contact_success"
export const FETCH_UPDATE_CONTACT_ERROR = "fetch_update_contact_error"

export const FETCH_REFRESH_CONTACT = "fetch_refresh_contact"
export const FETCH_REFRESH_CONTACT_SUCCESS = "fetch_refresh_success"

export const FETCH_DELETE_CONTACT = "fetch_delete_contact"
export const FETCH_DELETE_CONTACT_SUCCESS = "fetch_delete_contact_success"
export const FETCH_DELETE_CONTACT_ERROR = "fetch_delete_contact_error"


//Fetch Action GET CONTACT
const fetchActionGet = () => {
    return {
        type: FETCH_GET_CONTACT
    }
}

const fetchActionGetSuccess = (data) => {
    return {
        type: FETCH_GET_CONTACT_SUCCESS_TYPE,
        data
    }
}

const fetchActionGetError = (error) => {
    return {
        type: FETCH_GET_CONTACT_ERROR_TYPE,
        error
    }
}

const fetchActionUpdate = (updateContact, id) => {
    return {
        type: FETCH_UPDATE_CONTACT,
        dataUpdate: {
            updateContact,
            id
        }
    }
}

const fetchActionUpdateSuccess = (updateContact, id) => {
    return {
        type: FETCH_UPDATE_CONTACT_SUCCESS,
        dataUpdate: {
            updateContact,
            id
        }
    }
}

const fetchActionUpdateError = (error) => {
    return {
        type: FETCH_UPDATE_CONTACT_ERROR,
        error
    }
}

const fetchActionRefresh = () => {
    return {
        type: FETCH_REFRESH_CONTACT,
    }
}

const fetchActionRefreshSuccess = () => {
    return {
        type: FETCH_REFRESH_CONTACT_SUCCESS,
        dataRefresh: []
    }
}

const fetchActionDelete = (id) => {
    return {
        type: FETCH_DELETE_CONTACT,
        dataDelete: id
    }
}

const fetchActionDeleteSuccess = (id) => {
    return {
        type: FETCH_DELETE_CONTACT_SUCCESS,
        dataDelete: id
    }
}

const fetchActionDeleteError = (error) => {
    return {
        type: FETCH_DELETE_CONTACT_ERROR,
        error
    }
}

export {
    fetchActionGet, fetchActionGetSuccess, fetchActionGetError,
    fetchActionUpdate, fetchActionUpdateSuccess, fetchActionUpdateError,
    fetchActionRefresh, fetchActionRefreshSuccess,
    fetchActionDelete, fetchActionDeleteSuccess, fetchActionDeleteError
}