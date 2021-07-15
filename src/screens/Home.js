import React, { useCallback, useEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView, Image, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts } from '../services/contact.services';
import axios from 'axios';
import { fetchActionGet, fetchActionRefresh } from "../redux/action/contact.action";
import FormStyle from '../assets/styles/FormStyle';
import Photo from '../components/atoms/Photo';
import ButtonIcon from '../components/atoms/ButtonIcon';
import FieldForm from '../components/moleculs/FieldForm';
import TextForm from '../components/atoms/TextForm';

function Home() {

    const data = useSelector(state => state.ContactReducer.data)
    const loading = useSelector(state => state.ContactReducer.loading)
    const error = useSelector(state => state.ContactReducer.error)
    const navigation = useNavigation()
    const dispatch = useDispatch()

    useFocusEffect(useCallback(
        () => {
            dispatch(fetchActionGet())
        }, []))

    useEffect(() => {

    }, [data])

    function RefreshPage() {
        dispatch(fetchActionGet())
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#FFF' }}>
            <View style={FormStyle.topbarHome}>
                <TextForm
                    label='All Contacts'
                    style={FormStyle.title}
                />
                <ButtonIcon
                    onPress={() => RefreshPage()}
                    name='repeat'
                    size={25}
                    style={FormStyle.iconRefresh}
                />
            </View>
            <View style={FormStyle.line}></View>
            {error && !loading && <Text>Error get data</Text>}
            {loading ?
                <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 10 }} /> :
                <View style={{ flex: 1, alignSelf: 'center', marginTop: 16, marginBottom: 16 }}>
                    <FlatList
                        data={data}
                        renderItem={({ item }) =>
                            <>
                                <TouchableOpacity style={FormStyle.card} onPress={() => navigation.navigate('contactDetails', item)}>
                                    <View>
                                        {
                                            item.photo != 'N/A'
                                                ?
                                                <Image style={FormStyle.imageAdd} width={50} height={50} source={{ uri: item.photo }} ></Image>
                                                :
                                                <Image style={FormStyle.imageAdd} width={50} height={50} source={require('../assets/img/account.png')}></Image>
                                        }
                                    </View>
                                    <View style={FormStyle.viewText}>
                                        <Text style={FormStyle.textCardHome}>{item.firstName} {item.lastName}</Text>
                                        <Text style={FormStyle.textCard2Home}>{`${item.age} years old`}</Text>
                                    </View>
                                </TouchableOpacity>
                                <View style={FormStyle.line2}></View>
                            </>
                        }
                        keyExtractor={(item) => item.id}
                    />
                    <View style={{ bottom: 0, right: 0, position: 'absolute' }}>
                        <TouchableOpacity
                            style={FormStyle.floatingButton}
                            onPress={() => navigation.navigate('addContacts')}>
                            <Icon name="plus" size={35} color="#FFF" style={{ alignSelf: 'center' }} />
                        </TouchableOpacity>
                    </View>
                </View>
            }
        </View>
    )
}

export default Home