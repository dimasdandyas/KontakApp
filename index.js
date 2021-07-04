import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import React from 'react';
import Router from './src/router'
import { NavigationContainer } from '@react-navigation/native'
import { Provider } from 'react-redux';
import store from './src/redux/store/contact.store';

const App = () => (
    <Provider store={store}>
        <NavigationContainer>
            <Router />
        </NavigationContainer>
    </Provider>
)

AppRegistry.registerComponent(appName, () => App);
