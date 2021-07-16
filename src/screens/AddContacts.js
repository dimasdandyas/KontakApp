import React, { useCallback, useEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView, Image, FlatList, ActivityIndicator, TouchableOpacity, TextInput, ToastAndroid, Button } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import { postContact } from '../services/contact.services';
import { validateContact, validatePhoto } from '../validation/contact.validation';
import Icons from 'react-native-vector-icons/Feather';
import { fetchActionRefresh, fetchActionAdd } from '../redux/action/contact.action';
import FormStyle from '../assets/styles/FormStyle';
import Photo from '../components/atoms/Photo';
import ButtonIcon from '../components/atoms/ButtonIcon';
import FieldForm from '../components/moleculs/FieldForm';
import TextForm from '../components/atoms/TextForm';
import ChoosePhoto from '../components/moleculs/ChoosePhoto';

function AddContacts() {

    const data = useSelector(state => state.ContactReducer.dataAdd)
    const loading = useSelector(state => state.ContactReducer.loading)
    const error = useSelector(state => state.ContactReducer.error)
    const navigation = useNavigation()
    const dispatch = useDispatch()

    const [id, setId] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [age, setAge] = useState('')
    const [photo, setPhoto] = useState('')
    const [msg, setMsg] = useState("")
    const [btnDisable, setBtnDisable] = useState(false)

    function chooseFile() {
        launchImageLibrary({}, async function (res) {
            if (res.didCancel == true) { }
            else {
                setPhoto(res.assets[0].uri)
                const reference = storage().ref('/photos/' + res.assets[0].fileName)
                await reference.putFile(res.assets[0].uri)
                const url = await reference.getDownloadURL()
                setPhoto(url)
            }
        })
    }

    function NewContact() {
        const newContact = {
            firstName: firstName,
            lastName: lastName,
            age: age,
            photo: photo,
        }
        let messageError = validateContact(firstName, lastName, age, photo)
        if (validateContact(firstName, lastName, age, photo) == '') {
            setBtnDisable(true)
            postContact(newContact)
                .then(res => {
                    dispatch(fetchActionRefresh())
                    ToastAndroid.show("Add contact succes!", ToastAndroid.LONG);
                    navigation.navigate('home')
                })
                .catch(error => {
                    ToastAndroid.showWithGravity(error.data, ToastAndroid.SHORT, ToastAndroid.BOTTOM)
                })
                .finally(() => setBtnDisable(false))
        } else {
            setMsg(messageError)
        }
    }

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#FFF' }}>
            <View style={FormStyle.topbarAdd}>
                <ButtonIcon
                    onPress={() => navigation.goBack()}
                    name='chevron-left'
                    size={40}
                    style={FormStyle.iconBack}
                />
                <TextForm
                    label='Add Contact'
                    style={FormStyle.titleAdd}
                />
                <ButtonIcon
                    onPress={() => NewContact()} disabled={btnDisable ? true : false}
                    name='check'
                    size={35}
                    style={FormStyle.iconSubmit}
                />
            </View>
            <View style={{ flex: 1 }}>
                {loading ?
                    <>
                        <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 10 }} />
                    </> :

                    <ChoosePhoto
                        onPress={chooseFile}
                        photo={photo}
                    />
                }

                <FieldForm
                    label='First Name'
                    onChangeText={firstName => setFirstName(firstName)}
                />
                <FieldForm
                    label='Last Name'
                    onChangeText={lastName => setLastName(lastName)}
                />
                <FieldForm
                    label='Age'
                    keyboardType={'numeric'}
                    onChangeText={age => setAge(age)}
                />
            </View>
            {error && <Text>{error}</Text>}
            {msg != '' && <Text style={FormStyle.msgError}>{msg}</Text>}
        </ScrollView>
    )
}

export default AddContacts