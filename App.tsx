import 'react-native-gesture-handler';
import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {NavigationContainer, RouteProp} from "@react-navigation/native";
import {createSharedElementStackNavigator} from "react-navigation-shared-element";
import Events from "./Events";
import EventDetails from "./EventDetails";
import {ITEM} from "./data";
import {StackNavigationProp} from "@react-navigation/stack";

type Routes = {
    Events: undefined;
    EventDetails: {item: ITEM};
}

export interface HomeNavigationProps<RouteName extends keyof Routes> {
    navigation: StackNavigationProp<Routes, RouteName>;
    route: RouteProp<Routes, RouteName>;
}

const Stack = createSharedElementStackNavigator<Routes>();

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

