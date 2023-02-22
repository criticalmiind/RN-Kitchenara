import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';

const Zooming = ({ defaultValue = false, setZoomValue=(v)=>{} }) => {
    const zoom_list = [
        { name: '0.3x', val: 1 },
        { name: '0.5x', val: 21 },
        { name: ' 1x ', val: 45 },
        { name: ' 2x ', val: 80 },
        { name: ' 3x ', val: 128 },
    ]

    const renderItem = ({item}) => {
        return (
            <TouchableOpacity
                style={styles.v01(defaultValue == item.val)}
                onPress={() => {
                    setZoomValue(item.val)
                }}>
                <Text style={styles.txt01(defaultValue == item.val)}>{item.name}</Text>
            </TouchableOpacity>
        )
    };

    return (
        <View style={styles.container}>
            <FlatList
                horizontal={true}
                data={zoom_list}
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
        backgroundColor: is ? '#ffffff' : 'transparent',
        marginHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 2
    }),
    txt01: (is) => ({
        color: is ? '#000' : '#fff',
        fontSize: 12,
    })
});

export default Zooming;
