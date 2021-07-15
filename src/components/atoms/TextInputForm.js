import React from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import FormStyle from '../../assets/styles/FormStyle'

function TextInputForm({ defaultValue, editable, onChangeText, keyboardType }) {
    return (
        <TextInput
            style={FormStyle.textInput}
            defaultValue={defaultValue}
            editable={editable}
            onChangeText={onChangeText}
            keyboardType={keyboardType}
        />
    )
}

export default TextInputForm
