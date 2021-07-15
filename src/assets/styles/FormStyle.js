import React from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'

const styles = StyleSheet.create({
    topbar: {
        height: 50,
        backgroundColor: '#FFF',
        justifyContent: 'center',
    },
    topbarAdd: {
        height: 50,
        backgroundColor: '#FFF',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    topbarHome: {
        height: 50,
        backgroundColor: '#FFF',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    title: {
        fontSize: 17,
        marginLeft: 20,
        color: '#333'
    },
    titleAdd: {
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
        alignSelf: 'center',
        marginBottom: 35,
        marginTop: 10,
    },
    imageAdd: {
        borderRadius: 100,
        backgroundColor: '#645DAF',
        alignSelf: 'center',
    },
    imageList: {
        borderRadius: 100,
        backgroundColor: '#645DAF'
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
        marginTop: 5,
    },
    textCardHome: {
        width: 260,
        fontSize: 18,
        color: '#333',
        marginLeft: 20,

    },
    textCard2Home: {
        width: 260,
        fontSize: 18,
        color: '#333',
        marginLeft: 20,
        marginTop: 5,

    },
    msgError: {
        color: 'red',
        alignSelf: 'center',
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
    floatingButton: {
        width: 70,
        height: 70,
        backgroundColor: '#645DAF',
        borderRadius: 100,
        alignSelf: 'flex-end',
        marginTop: 15,
        marginBottom: 30,
        justifyContent: 'center',
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
    iconBack: {
        // size:40, 
        color: "#7E7E7E",
        alignSelf: 'flex-start',
        marginLeft: 10,
        marginTop: 15,
    },
    iconSubmit: {
        // size={ 35},
        color: "#7E7E7E",
        marginRight: 20,
        marginTop: 15,
    },
    iconRefresh: {
        // size={25} 
        color: "#333",
        marginRight: 20,
    },
})

export default styles