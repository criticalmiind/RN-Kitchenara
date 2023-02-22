import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';

const VideoTimings = ({ defaultTime = false, getMaxTime }) => {
    const times_list = [
        { name: '3m', val: 180 },
        { name: '60s', val: 60 },
        { name: '15s', val: 15 },
    ]
    const [zoomValue, setZoomValue] = useState(defaultTime ? defaultTime : times_list[1]);

    const renderItem = ({item}) => {
        return (
            <TouchableOpacity
                style={styles.v01(zoomValue.val == item.val)}
                onPress={() => {
                    setZoomValue(item)
                    if(getMaxTime) getMaxTime(item.val)
                }}>
                <Text style={styles.txt01(zoomValue.val == item.val)}>{item.name}</Text>
            </TouchableOpacity>
        )
    };

    return (
        <View style={styles.container}>
            <FlatList
                horizontal={true}
                data={times_list}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    v01: (is) => ({
        paddingHorizontal: 10,
        backgroundColor: is ? 'rgba(0,0,0,0.5)' : 'transparent',
        marginHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 20
    }),
    txt01: (is) => ({
        color: '#fff',
        fontSize: 12,
    })
});

export default VideoTimings;
