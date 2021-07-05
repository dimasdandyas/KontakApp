const GetContacts = (data) => {
    return {
        type: 'GET_CONTACTS',
        data: data
    }
}

const PostContact = (data) => {
    return {
        type: 'POST_CONTACT',
        data: data
    }
}

const PutContact = (data) => {
    return {
        type: 'PUT_CONTACT',
        data: data
    }
}

const DeleteContact = (data) => {
    return {
        type: 'DELETE_CONTACT',
        data: data
    }
}

const RefreshContact = () => {
    return {
        type: 'REFRESH_CONTACTS',
        data: []
    }
}

export { GetContacts, PostContact, PutContact, DeleteContact, RefreshContact }