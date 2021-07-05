import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Text, View, StyleSheet, ScrollView, Image, FlatList, ImageBackground, TouchableOpacity, TextInput } from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/Feather';
import { createStackNavigator } from '@react-navigation/stack';
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact, putContact } from '../services/contact.services';
import { launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import { RefreshContact } from '../redux/action/contact.action';

function EditContacts() {

    const navigation = useNavigation()
    const dispatch = useDispatch()
    const route = useRoute()
    const [data, setData] = useState('')
    const [id, setId] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [age, setAge] = useState('')
    const [photo, setPhoto] = useState('')

    useFocusEffect(useCallback(() => {

    }, [photo]))

    useEffect(() => {
        console.log(route.params)
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
            console.log(res);
            setPhoto(res.assets[0].uri)
            console.log('ini poto', photo)
            const reference = storage().ref('/photos/' + res.assets[0].fileName)

            await reference.putFile(res.assets[0].uri)
            const url = await reference.getDownloadURL()
            setPhoto(url)
            console.log(url);
        })
    }

    function UpdateContact() {
        console.log('edit contact')
        const updateContact = {
            firstName: firstName,
            lastName: lastName,
            age: age,
            photo: photo,
        }
        console.log('edit', updateContact)
        putContact(updateContact, id)
            .then(res => {
                console.log(res)
                dispatch(RefreshContact(updateContact))

                navigation.navigate('home')
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#FFF' }}>
            <View style={styles.topbar}>
                <Icon name="chevron-left" size={40} color="#7E7E7E"
                    style={{ marginLeft: 10, marginTop: 15, }}
                    onPress={() => navigation.goBack()} />
                <Text style={styles.title}>{`Edit Contact`}</Text>
                <TouchableOpacity onPress={() => UpdateContact()} >
                    <Icon name="check" size={35} color="#7E7E7E"
                        style={{ marginRight: 20, marginTop: 15, }} />
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1, marginTop: 20 }}>
                <TouchableOpacity onPress={chooseFile}>
                    <Image style={styles.image} width={150} height={150} source={photo == '' ? require('../assets/img/account.png') : { uri: photo }}></Image>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                    <Text style={styles.textCard}>{`First Name`}</Text>
                    <TextInput
                        style={styles.textInput}
                        defaultValue={firstName}
                        onChangeText={firstName => setFirstName(firstName)}
                    />
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                    <Text style={styles.textCard}>{`Last Name`}</Text>
                    <TextInput
                        style={styles.textInput}
                        defaultValue={lastName}
                        onChangeText={lastName => setLastName(lastName)}
                    />
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                    <Text style={styles.textCard}>{`Age`}</Text>
                    <TextInput
                        style={styles.textInput}
                        defaultValue={age}
                        onChangeText={age => setAge(age)}
                    />
                </View>
            </View>
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
        // backgroundColor: '#333',
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
        // backgroundColor: '#333',
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 10
    },
    image: {
        // width: 50,
        // height: 50,
        borderRadius: 100,
        backgroundColor: '#645DAF',
        alignSelf: 'center',
        marginBottom: 35,
        marginTop: 10,
    },
    viewText: {

    },
    textCard: {
        width: 90,
        fontSize: 18,
        color: '#333',
        // backgroundColor: '#333',
        marginLeft: 20,
        marginTop: 20,
        marginRight: 20,
    },
    textCard2: {
        width: 260,
        fontSize: 18,
        color: '#333',
        // backgroundColor: '#FFF',
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
    }
})

export default EditContacts