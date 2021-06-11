import React from 'react';
import {Text, View} from 'react-native';
import {HomeNavigationProps} from "./App";


const EventDetails: React.FC<HomeNavigationProps<'EventDetails'>> = ({route}) => {
    const {item} = route.params
    return <View>
        <Text>{item.title}</Text>
    </View>;
};


export default EventDetails;
