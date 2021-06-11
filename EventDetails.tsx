import React from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import {HomeNavigationProps} from "./App";
import {AntDesign} from "@expo/vector-icons";
import {SPACING} from "./OverflowItems";
import {SharedElement} from "react-navigation-shared-element";


const {height} = Dimensions.get('window')

const EventDetails: React.FC<HomeNavigationProps<'EventDetails'>> = ({route, navigation}) => {
    const {item} = route.params
    return (
        <View style={{flex: 1}}>
            <SharedElement
                id={`item.${item.key}.image`}
                style={[
                    StyleSheet.absoluteFillObject,
                ]}
            >
                <Image source={{uri: item.poster}} style={[StyleSheet.absoluteFillObject]}/>
            </SharedElement>
            <View
                style={[StyleSheet.absoluteFillObject, {backgroundColor: '#000', opacity: 0.4}]}
            />
            <AntDesign
                name='close'
                size={28}
                style={{
                    padding: SPACING,
                    position: "absolute",
                    top: SPACING,
                    right: SPACING,
                    zIndex: 2
                }}
                color={'#fff'}
                onPress={() => navigation.goBack()}
            />
            <SharedElement
                id='general.bg'
                style={[
                    StyleSheet.absoluteFillObject,
                    {
                        transform: [{translateY: height}],
                    }
                ]}
            >
                <View style={[
                    StyleSheet.absoluteFillObject,
                    {
                        backgroundColor: 'red',
                        transform: [{translateY: -height * 0.3}],
                        padding: SPACING * 2,
                        borderRadius: 16
                    }
                ]}>
                    <Text style={{fontWeight: '900', fontSize: 28, marginBottom: 8}}>{item.title}</Text>
                    <Text style={{fontWeight: '500', fontSize: 16, marginBottom: 4}}>{item.location}</Text>
                    <Text style={{fontSize: 12}}>{item.date}</Text>
                </View>
            </SharedElement>
        </View>
    );
};

EventDetails.sharedElements = (route, otherRoute, showing) => {
    const {item} = route.params;
    return [
        {
            id: `item.${item.key}.image`
        },
        {
            id: 'general.bg'
        }
    ]
}

export default EventDetails;
