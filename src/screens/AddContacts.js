import React, { useCallback, useEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView, Image, FlatList, ActivityIndicator, TouchableOpacity, TextInput, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import { postContact } from '../services/contact.services';
import { RefreshContact } from '../redux/action/contact.action';
import { validateContact, validatePhoto } from '../validation/contact.validation';
import Icons from 'react-native-vector-icons/Feather';

function AddContacts() {

    const assignState = useSelector((state) => state.contactReducer)
    const navigation = useNavigation()
    const route = useRoute()
    const dispatch = useDispatch()
    const [data, setData] = useState('')
    const [id, setId] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [age, setAge] = useState('')
    const [photo, setPhoto] = useState('')
    const [msg, setMsg] = useState("")
    const [loading, setLoading] = useState(false)
    const [btnDisable, setBtnDisable] = useState(false)

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
                    dispatch(RefreshContact(newContact))
                    navigation.navigate('home')
                    ToastAndroid.show("Add contact succes!", ToastAndroid.LONG);
                })
                .catch(error => {
                    ToastAndroid.showWithGravity(error.data.message, ToastAndroid.SHORT, ToastAndroid.BOTTOM)
                })
                .finally(() => setBtnDisable(false))

        } else {
            setMsg(messageError)
        }
    }

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#FFF' }}>
            <View style={styles.topbar}>
                <Icon name="chevron-left" size={40} color="#7E7E7E"
                    style={{ marginLeft: 10, marginTop: 15, }}
                    onPress={() => navigation.goBack()} />
                <Text style={styles.title}>{`Add Contact`}</Text>
                <TouchableOpacity onPress={() => NewContact()} disabled={btnDisable ? true : false}>
                    <Icon name="check" size={35} color="#7E7E7E"
                        style={{ marginRight: 20, marginTop: 15, }} />
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
                {loading ?
                    <>
                        <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 10 }} />
                        <Text style={styles.msgError}>`Loading get image from URL... wait a second`</Text>
                    </> :
                    <TouchableOpacity onPress={chooseFile} style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 30, marginBottom: 30 }}>
                        <Image style={styles.image} width={150} height={150} source={photo == '' ? require('../assets/img/account.png') : { uri: photo }}></Image>
                        <View  style={{ alignSelf: 'flex-end' }}>
                            <Icons name="edit" size={30} color="#F2BF7E" style={{ marginLeft: -20 }} />
                        </View>
                    </TouchableOpacity>
                }

                <View style={{ flexDirection: 'row', marginBottom: 20, alignSelf:'center' }}>
                    <Text style={styles.textCard}>{`First Name`}</Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={firstName => setFirstName(firstName)}
                    />
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 20, alignSelf:'center' }}>
                    <Text style={styles.textCard}>{`Last Name`}</Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={lastName => setLastName(lastName)}
                    />
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 20, alignSelf:'center' }}>
                    <Text style={styles.textCard}>{`Age`}</Text>
                    <TextInput
                        style={styles.textInput}
                        keyboardType={'numeric'}
                        onChangeText={age => setAge(age)}
                    />
                </View>
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

export default AddContacts