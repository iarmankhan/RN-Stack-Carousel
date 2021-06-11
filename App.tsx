import 'react-native-gesture-handler';
import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createSharedElementStackNavigator} from "react-navigation-shared-element";
import Events from "./Events";
import EventDetails from "./EventDetails";


const Stack = createSharedElementStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Events" headerMode='none'>
                <Stack.Screen name="Events" component={Events} />
                <Stack.Screen
                    name="EventDetails"
                    component={EventDetails}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

