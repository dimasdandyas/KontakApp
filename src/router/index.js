import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import * as screen from '../screens/'

function Router () {

    const Stack = createStackNavigator()

    return (
        <Stack.Navigator>
            <Stack.Screen name="home" component={screen.Home} options={{ headerShown: false }} />
            <Stack.Screen name="addContacts" component={screen.AddContacts} options={{ headerShown: false }} />
            <Stack.Screen name="contactDetails" component={screen.ContactDetails} options={{ headerShown: false }} />
            <Stack.Screen name="editContacts" component={screen.EditContacts} options={{ headerShown: false }} />
        </Stack.Navigator>

    )

}

export default Router