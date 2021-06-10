import React from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';
import {ITEM} from "./data";
import {EvilIcons} from "@expo/vector-icons";

interface OverflowItemsProps {
    data: ITEM[];
    scrollX: Animated.Value
}

const OVERFLOW_HEIGHT = 80
export const SPACING = 10

const OverflowItems: React.FC<OverflowItemsProps> = ({data, scrollX}) => {
    const inputRange = [-1, 0, 1];
    const translateY = scrollX.interpolate({
        inputRange,
        outputRange: [OVERFLOW_HEIGHT, 0, -OVERFLOW_HEIGHT],
    });
    return (
        <View style={styles.container}>
            <Animated.View style={{transform: [{translateY}]}}>
                {
                    data.map((item, index) => (
                        <View key={index} style={styles.itemContainer}>
                            <Text style={[styles.title]} numberOfLines={1}>
                                {item.title}
                            </Text>
                            <View style={styles.itemContainerRow}>
                                <Text style={[styles.location]}>
                                    <EvilIcons
                                        name='location'
                                        size={16}
                                        color='black'
                                        style={{marginRight: 5}}
                                    />
                                    {item.location}
                                </Text>
                                <Text style={[styles.date]}>{item.date}</Text>
                            </View>
                        </View>
                    ))
                }
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: OVERFLOW_HEIGHT,
        overflow: 'hidden',
    },
    itemContainer: {
        height: OVERFLOW_HEIGHT,
        padding: SPACING * 2,
    },
    title: {
        fontSize: 28,
        fontWeight: '900',
        textTransform: 'uppercase',
        letterSpacing: -1,
        marginBottom: 8
    },
    itemContainerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    location: {
        fontSize: 16
    },
    date: {
        fontSize: 12
    }
});

export default OverflowItems;
