import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import ItemListScreen from '../screens/ItemListScreen';
import AddEditItemScreen from '../screens/AddEditItemScreen';

const Stack = createStackNavigator();

const RootNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="ItemListScreen" component={ItemListScreen} />
            <Stack.Screen name="AddEditItemScreen" component={AddEditItemScreen} />
        </Stack.Navigator>
    );
}

export default RootNavigator;

