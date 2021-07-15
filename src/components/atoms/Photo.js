import React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import FormStyle from '../../assets/styles/FormStyle'

function Photo({photo}) {
    return (
        <View>
            {
                photo != 'N/A'
                    ?
                    <Image style={FormStyle.image} width={150} height={150} source={{ uri: photo }} ></Image>
                    :
                    <Image style={FormStyle.image} width={150} height={150} source={require('../../assets/img/account.png')}></Image>
            }
        </View>
    )
}

export default Photo
