import React, {useRef, useState} from 'react';
import {Animated, Dimensions, FlatList, Image, SafeAreaView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {DATA, ITEM} from "./data";
import {Directions, FlingGestureHandler, State} from "react-native-gesture-handler";
import {StatusBar} from "expo-status-bar";
import OverflowItems, {SPACING} from "./OverflowItems";
import {StackNavigationProp} from "@react-navigation/stack";
import {HomeNavigationProps} from "./App";

interface EventsProps {
}


const {width} = Dimensions.get('window')

const ITEM_WIDTH = width * 0.76;
const ITEM_HEIGHT = ITEM_WIDTH * 1.7;
const VISIBLE_ITEMS = 3;


const Events: React.FC<HomeNavigationProps<'Events'>> = ({navigation}) => {
    const [data, setData] = useState<ITEM[]>(DATA)
    const scrollXIndex = useRef(new Animated.Value(0)).current;
    const scrollXAnimated = useRef(new Animated.Value(0)).current;
    const [index, setIndex] = useState(0);

    const setActiveIndex = React.useCallback((activeIndex) => {
        scrollXIndex.setValue(activeIndex);
        setIndex(activeIndex);
    }, []);

    React.useEffect(() => {
        Animated.spring(scrollXAnimated, {
            toValue: scrollXIndex,
            useNativeDriver: true,
        }).start();
    });


    return (
        <FlingGestureHandler
            key='left'
            direction={Directions.LEFT}
            onHandlerStateChange={e => {
                if (e.nativeEvent.state === State.END) {

                    if (index === data.length - 1) {
                        return;
                    }
                    setActiveIndex(index + 1)
                }
            }}
        >
            <FlingGestureHandler
                key='right'
                direction={Directions.RIGHT}
                onHandlerStateChange={e => {
                    if (e.nativeEvent.state === State.END) {
                        if (index === 0) {
                            return;
                        }
                        setActiveIndex(index - 1)
                    }
                }}
            >
                <SafeAreaView style={styles.container}>
                    <StatusBar hidden/>
                    <OverflowItems data={data} scrollX={scrollXAnimated}/>

                    <FlatList
                        horizontal
                        inverted
                        contentContainerStyle={{
                            flex: 1,
                            justifyContent: 'center',
                            padding: SPACING * 2,
                            marginTop: 50,
                        }}
                        scrollEnabled={false}
                        removeClippedSubviews={false}
                        showsHorizontalScrollIndicator={false}
                        data={data}
                        keyExtractor={(_, index) => String(index)}
                        CellRendererComponent={({
                                                    item,
                                                    index,
                                                    children,
                                                    style,
                                                    ...props
                                                }) => {
                            const newStyle = [style, {zIndex: data.length - index}];

                            return (
                                <View style={newStyle} index={index} {...props}>
                                    {children}
                                </View>
                            )
                        }}
                        renderItem={({item, index: i}) => {
                            const inputRange = [i - 1, i, i + 1]
                            const translateX = scrollXAnimated.interpolate({
                                inputRange,
                                outputRange: [50, 0, -100]
                            })
                            const scale = scrollXAnimated.interpolate({
                                inputRange,
                                outputRange: [0.8, 1, 1.3],
                            });
                            const opacity = scrollXAnimated.interpolate({
                                inputRange,
                                outputRange: [1 - 1 / VISIBLE_ITEMS, 1, 0],
                            });
                            return (
                                <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('EventDetails', {item: data[index]})}>
                                    <Animated.View
                                        style={{
                                            position: 'absolute',
                                            left: -ITEM_WIDTH / 2,
                                            opacity,
                                            transform: [{translateX}, {scale}]
                                        }}
                                    >

                                        <Image
                                            source={{uri: item.poster}}
                                            style={{
                                                width: ITEM_WIDTH,
                                                height: ITEM_HEIGHT,
                                                borderRadius: 14,
                                            }}
                                        />

                                    </Animated.View>
                                </TouchableOpacity>
                            )
                        }}
                    />
                </SafeAreaView>
            </FlingGestureHandler>
        </FlingGestureHandler>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

export default Events;
