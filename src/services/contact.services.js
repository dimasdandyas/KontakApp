import axios from 'axios'

const URL = 'https://simple-contact-crud.herokuapp.com/contact'

const getContacts = async () => {
    try {
        const { data } = await axios.get(URL);
        return data;
    } catch (error) {
        throw error.data
    }
}

const getContactId = async (id) => {
    try {
        const { data } = await axios.get(URL+'/'+id);
        return data;
    } catch (error) {
        throw error.data
    }
}

const postContact = async () => {
    try {
        const { data } = await axios.post(URL);
        return data
    } catch (error) {
        throw error.data
    }
}

const putContact = async () => {
    try {
        const {data} = await axios.put(URL);
        return data
    } catch (error) {
        throw error.data
    }
}

const deleteContact = async (id) => {
    try {
        const {data} = await axios.delete(URL+'/'+id);
        return data
    } catch (error) {
        throw error.data
    }
}

export { getContacts, getContactId, postContact, putContact, deleteContact}