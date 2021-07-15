import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Icons from 'react-native-vector-icons/Feather';
import FormStyle from '../../assets/styles/FormStyle'

function ButtonDelete({ onPress }) {
    return (
        <TouchableOpacity
            style={FormStyle.btn}
            onPress={onPress}>
            <Icons name="x" size={30} color="#7E7E7E" style={{ alignSelf: 'center' }} />
            <Text style={{ fontSize: 16, alignSelf: 'center', marginTop: 5 }}>Delete</Text>
        </TouchableOpacity>
    )
}

export default ButtonDelete
