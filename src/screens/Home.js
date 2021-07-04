import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView, Image, FlatList, ImageBackground, TouchableOpacity } from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Feather';
import { createStackNavigator } from '@react-navigation/stack';
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts } from '../services/contact.services';
import { GetContacts } from '../redux/action/contact.action';

function Home() {

    const assignState = useSelector((state) => state.contactReducer)
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const [data, setData] = useState('')

    useEffect(() => {
        getContacts()
            .then(res => {
                dispatch(GetContacts(res.data))
                console.log(res.data)
            })
            .catch(error => {

            })
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: '#FFF' }}>
            <View style={styles.topbar}>
                <Text style={styles.title}>All Contacts</Text>
            </View>
            <View style={styles.line}></View>
            <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'center', marginTop: 10 }}>
                <FlatList
                    data={assignState}
                    renderItem={({ item }) =>
                        <>
                            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('contactDetails', item)}>
                                <View>
                                    {
                                        item.photo != 'N/A'
                                            ?
                                            <Image style={styles.image} width={50} height={50} source={{ uri: item.photo }} ></Image>
                                            :
                                            <Image style={styles.image} width={50} height={50} source={require('../assets/img/account.png')}></Image>
                                    }
                                </View>

                                <View style={styles.viewText}>
                                    <Text style={styles.textCard}>{item.firstName} {item.lastName}</Text>
                                    <Text style={styles.textCard2}>{`Age ${item.age}`}</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={styles.line2}></View>
                        </>
                    }
                    keyExtractor={(item) => item.id}
                />
            </View>
            <View>
                <TouchableOpacity
                    style={styles.btnAdd}
                    onPress={() => navigation.navigate('addContacts')}>
                    <Icon name="plus" size={35} color="#FFF" style={{ alignSelf: 'center' }} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    topbar: {
        height: 50,
        backgroundColor: '#FFF',
        justifyContent: 'center',
    },
    title: {
        fontSize: 17,
        marginLeft: 20,
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
        backgroundColor: '#645DAF'
    },
    viewText: {

    },
    textCard: {
        width: 260,
        fontSize: 18,
        color: '#333',
        // backgroundColor: '#FFF',
        marginLeft: 20,

    },
    textCard2: {
        width: 260,
        fontSize: 18,
        color: '#333',
        // backgroundColor: '#FFF',
        marginLeft: 20,
        marginTop: 5,

    },
    btnAdd: {
        width: 70,
        height: 70,
        backgroundColor: '#645DAF',
        borderRadius: 100,
        alignSelf: 'flex-end',
        marginTop: 15,
        marginBottom: 30,
        marginRight: 30,
        justifyContent: 'center',
    },
})

export default Home