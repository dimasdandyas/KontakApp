import React from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import TextFrom from '../atoms/TextForm';
import TextInputForm from '../atoms/TextInputForm';
import FormStyle from '../../assets/styles/FormStyle';

function FieldForm({ label, style, defaultValue, editable, onChangeText, keyboardType }) {
    return (
        <View style={{ flexDirection: 'row', marginBottom: 20, alignSelf: 'center' }}>
            <TextFrom
                label={label}
                style={FormStyle.textCard}
            />
            <TextInputForm
                defaultValue={defaultValue}
                editable={editable}
                onChangeText={onChangeText}
                keyboardType={keyboardType}
            />
        </View>
    )
}

export default FieldForm
