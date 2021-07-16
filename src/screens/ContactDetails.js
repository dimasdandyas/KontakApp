import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Text, View, StyleSheet, ScrollView, Image, ActivityIndicator, ImageBackground, TouchableOpacity, TextInput, ToastAndroid } from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/Feather';
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getContactId } from '../services/contact.services';
import { deleteContact } from '../services/contact.services';
import { fetchActionDelete, fetchClearError } from '../redux/action/contact.action';
import Photo from '../components/atoms/Photo';
import ButtonEdit from '../components/atoms/ButtonEdit';
import ButtonDelete from '../components/atoms/ButtonDelete';
import ButtonIcon from '../components/atoms/ButtonIcon';
import FieldForm from '../components/moleculs/FieldForm';
import FormStyle from '../assets/styles/FormStyle';

function ContactDetails() {

    const loading = useSelector(state => state.ContactReducer.loading)
    const error = useSelector(state => state.ContactReducer.error)
    const data = useSelector(state => state.ContactReducer.dataDelete)

    const navigation = useNavigation()
    const dispatch = useDispatch()
    const route = useRoute()
    const [id, setId] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [age, setAge] = useState('')
    const [photo, setPhoto] = useState()
    const [loadings, setLoading] = useState(false)
    const [msgError, setMsgError] = useState('')
    const [init, setInit] = useState(false)

    useFocusEffect(useCallback(() => {

    }, [photo]))

    useEffect(() => {
        setLoading(true)
        getContactId(route.params.id)
            .then(res => {
                setId(res.data.id)
                setFirstName(res.data.firstName)
                setLastName(res.data.lastName)
                const age = res.data.age
                setAge(age.toString())
                setPhoto(res.data.photo)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    useEffect(() => {
        if (init == true) {
            if (error) {
                dispatch(fetchClearError())
                ToastAndroid.show(error, ToastAndroid.SHORT)
            }
            navigation.navigate('home')
            // else {
            //     navigation.navigate('home')
            // }
        } else {
            setInit(true)
        }
    }, [error])

    function deleteContactList(id) {
        dispatch(fetchActionDelete(id))
    }

    function AlertDelete(id) {
        Alert.alert(
            "Delete this contact ?", "",
            [
                {
                    text: "No",
                    onPress: () => ToastAndroid.show("Cancel removes contact", ToastAndroid.LONG)
                },
                {
                    text: "Yes",
                    onPress: () => deleteContactList(id)
                }
            ]
        );
    }

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#FFF' }}>
            <ButtonIcon
                onPress={() => navigation.goBack()}
                name='chevron-left'
                size={40}
                style={FormStyle.iconBack}
            />
            {loading ?
                <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 10 }} /> :
                <View style={{ flex: 1, marginTop: 10 }}>
                    <View style={{ flex: 1 }}>
                        <Photo photo={photo} />
                        <FieldForm
                            label='First Name'
                            defaultValue={firstName}
                            editable={false}
                        />
                        <FieldForm
                            label='Last Name'
                            defaultValue={lastName}
                            editable={false}
                        />
                        <FieldForm
                            label='Age'
                            defaultValue={age}
                            editable={false}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <ButtonEdit
                            onPress={() => navigation.navigate('editContacts', { item: { id, firstName, lastName, age, photo } })}>
                        </ButtonEdit>
                        <ButtonDelete
                            onPress={() => AlertDelete(id)}>
                        </ButtonDelete>
                    </View>
                </View>
            }
        </ScrollView>
    )
}

export default ContactDetails