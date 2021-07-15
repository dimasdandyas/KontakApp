import React from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import FormStyle from '../../assets/styles/FormStyle'

function TextForm({ label, style }) {
    return (
        <Text style={style}>{label}</Text>
    )
}

export default TextForm
