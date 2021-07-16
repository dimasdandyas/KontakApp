import React from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import TextFrom from '../atoms/TextForm';
import TextInputForm from '../atoms/TextInputForm';
import FormStyle from '../../assets/styles/FormStyle';
import Icons from 'react-native-vector-icons/Feather';

function ChoosePhoto({ onPress, photo}) {
    return (
        <TouchableOpacity onPress={onPress} style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 30, marginBottom: 30 }}>
            <Image style={FormStyle.imageAdd} width={150} height={150} source={photo == '' ? require('../../assets/img/account.png') : { uri: photo }}></Image>
            <View style={{ alignSelf: 'flex-end' }}>
                <Icons name="edit" size={30} color="#F2BF7E" style={{ marginLeft: -20 }} />
            </View>
        </TouchableOpacity>
    )
}

export default ChoosePhoto
