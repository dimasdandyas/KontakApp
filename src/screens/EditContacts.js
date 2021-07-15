import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Text, View, StyleSheet, ScrollView, Image, ActivityIndicator, ToastAndroid, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact, putContact } from '../services/contact.services';
import { launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import { fetchActionUpdate } from '../redux/action/contact.action';
import { validateContact } from '../validation/contact.validation';
import Icons from 'react-native-vector-icons/Feather';
import FormStyle from '../assets/styles/FormStyle';
import Photo from '../components/atoms/Photo';
import ButtonIcon from '../components/atoms/ButtonIcon';
import FieldForm from '../components/moleculs/FieldForm';
import TextForm from '../components/atoms/TextForm';

function EditContacts() {

    const error = useSelector(state => state.ContactReducer.error)

    const navigation = useNavigation()
    const dispatch = useDispatch()
    const route = useRoute()
    const [data, setData] = useState('')
    const [id, setId] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [age, setAge] = useState('')
    const [photo, setPhoto] = useState('')
    const [msg, setMsg] = useState("")
    const [loading, setLoading] = useState(false)
    const [btnDisable, setBtnDisable] = useState(false)

    useFocusEffect(useCallback(() => {

    }, [photo]))

    useEffect(() => {
        const routes = route.params
        setId(routes.item.id)
        setFirstName(routes.item.firstName)
        setLastName(routes.item.lastName)
        const age = routes.item.age
        setAge(age.toString())
        setPhoto(routes.item.photo)
    }, [])

    function chooseFile() {
        launchImageLibrary({}, async function (res) {
            if (res.didCancel == true) {

            } else {
                setPhoto(res.assets[0].uri)
                const reference = storage().ref('/photos/' + res.assets[0].fileName)
                await reference.putFile(res.assets[0].uri)
                setLoading(true)
                const url = await reference.getDownloadURL()
                setPhoto(url)
                setLoading(false)
            }
        })
    }

    function UpdateContact() {
        let messageError = validateContact(firstName, lastName, age, photo)
        const updateContact = {
            firstName: firstName,
            lastName: lastName,
            age: age,
            photo: photo,
        }
        if (validateContact(firstName, lastName, age, photo) == '') {
            if (!error) {
                setBtnDisable(true)
                dispatch(fetchActionUpdate(updateContact, id))
                console.log(fetchActionUpdate(updateContact, id))
                ToastAndroid.show("Success update contact!", ToastAndroid.LONG)
                navigation.navigate('home')
            } else {
                ToastAndroid.show(error, ToastAndroid.LONG)
                setBtnDisable(false)
            }
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
                    label='Edit Contact'
                    style={FormStyle.titleAdd}
                />
                <ButtonIcon
                    onPress={() => UpdateContact()} disabled={btnDisable ? true : false}
                    name='check'
                    size={35}
                    style={FormStyle.iconSubmit}
                />
            </View>
            <View>
                {loading ?
                    <>
                        <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 10 }} />
                        <Text style={styles.msgError}>`Loading get image from URL... wait a second`</Text>
                    </> :
                    <TouchableOpacity onPress={chooseFile} style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 30, marginBottom: 30, }}>
                        <Image style={styles.image} width={150} height={150} source={photo == '' ? require('../assets/img/account.png') : { uri: photo }}></Image>
                        <View style={{ alignSelf: 'flex-end' }}>
                            <Icons name="edit" size={30} color="#F2BF7E" style={{ marginLeft: -20 }} />
                        </View>
                    </TouchableOpacity>
                }
                <FieldForm
                    label='First Name'
                    defaultValue={firstName}
                    onChangeText={firstName => setFirstName(firstName)}
                />
                <FieldForm
                    label='Last Name'
                    defaultValue={lastName}
                    onChangeText={lastName => setLastName(lastName)}
                />
                <FieldForm
                    label='Age'
                    keyboardType={'numeric'}
                    defaultValue={age}
                    onChangeText={age => setAge(age)}
                />
            </View>
            {msg != '' && <Text style={styles.msgError}>{msg}</Text>}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    topbar: {
        height: 50,
        backgroundColor: '#FFF',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    title: {
        fontSize: 20,
        color: '#333',
        marginTop: 20,
    },
    line: {
        height: 1,
        backgroundColor: '#CACACA',
    },
    line2: {
        width: 350,
        height: 1,
        backgroundColor: '#CACACA',
        alignSelf: 'center',
        marginTop: 10
    },
    card: {
        width: 350,
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 10
    },
    image: {
        borderRadius: 100,
        backgroundColor: '#645DAF',
        alignSelf: 'center',

    },
    viewText: {

    },
    textCard: {
        width: 90,
        fontSize: 18,
        color: '#333',
        marginTop: 20,
        marginRight: 20,
    },
    textCard2: {
        width: 260,
        fontSize: 18,
        color: '#333',
        marginLeft: 20,
        marginTop: 5,
    },
    btn: {
        width: 50,
        height: 50,
        borderRadius: 100,
        alignSelf: 'flex-end',
        marginTop: 15,
        marginBottom: 30,
        justifyContent: 'center',
        marginHorizontal: 10,
    },
    textInput: {
        width: 250,
        height: 50,
        backgroundColor: '#F2F2F2',
        borderRadius: 10,
        padding: 15,
        color: '#333',
        fontSize: 18,
        marginTop: 5,
    },
    msgError: {
        color: 'red',
        alignSelf: 'center',
    },
})

export default EditContacts