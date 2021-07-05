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
        throw error.response
    }
}

const postContact = async (newContact) => {
    try {
        const { data } = await axios.post(URL, newContact);
        return data
    } catch (error) {
        throw error.response
    }
}

const putContact = async (updateContact, id) => {
    try {
        const {data} = await axios.put(URL+'/'+id, updateContact);
        return data
    } catch (error) {
        throw error.response
    }
}

const deleteContact = async (id) => {
    try {
        const {data} = await axios.delete(URL+'/'+id);
        return data
    } catch (error) {
        console.log("error ", error.response.data)
        throw error.response
    }
}

export { getContacts, getContactId, postContact, putContact, deleteContact}