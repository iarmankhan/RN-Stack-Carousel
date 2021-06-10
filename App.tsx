import {StatusBar} from 'expo-status-bar';
import React, {useRef, useState} from 'react';
import {Animated, Dimensions, SafeAreaView, StyleSheet} from 'react-native';
import OverflowItems from "./OverflowItems";
import {DATA} from "./data";


const {width} = Dimensions.get('window')

const ITEM_WIDTH = width * 0.76;
const ITEM_HEIGHT = ITEM_WIDTH * 1.7;
const VISIBLE_ITEMS = 3;


export default function App() {
    const scrollXIndex = useRef(new Animated.Value(0)).current;
    const scrollXAnimated = useRef(new Animated.Value(0)).current;
    const [index, setIndex] = useState(0);

    const setActiveIndex = React.useCallback((activeIndex) => {
        scrollXIndex.setValue(activeIndex);
        setIndex(activeIndex);
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar hidden/>
            <OverflowItems data={DATA} scrollX={scrollXAnimated}/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
