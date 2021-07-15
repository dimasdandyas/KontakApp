import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FormStyle from '../../assets/styles/FormStyle'

function ButtonIcon({ onPress, name, size, style }) {
    return (
        <TouchableOpacity
            onPress={onPress}>
            <Icon name={name} size={size} style={style}/>
        </TouchableOpacity>
    )
}

export default ButtonIcon
