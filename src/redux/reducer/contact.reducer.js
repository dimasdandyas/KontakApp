const ContactReducer = (state = [], action) => {
    switch (action.type) {
        case 'GET_CONTACTS':
            if (action.data) return [...state, ...action.data]
        case 'POST_CONTACT':
            return [...state, action.data]
        case 'PUT_CONTACT':
            const contactPut = state.findIndex(item => item.id == action.data.id)
            let updateState = [...state]
            updateState[contactPut] = action.data
            return updateState
        case 'DELETE_CONTACT':
            const newState = state.filter(item => item.id !== action.data.id)
            return newState
        case 'REFRESH_CONTACTS':
            const refreshState = []
            return refreshState
        default:
            return state
    }
}

export default ContactReducer