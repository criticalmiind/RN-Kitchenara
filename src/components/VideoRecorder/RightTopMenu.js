import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';

const RightTopMenu = ({ is_flash=false, is_flip=false, timer=false, onClick=(type, value)=>{} }) => {
    return (<>
        <View style={styles.containerRight}>
            <TouchableOpacity
                onPress={() => { onClick('flip', !is_flip) }}>
                <View style={styles.v01}></View>
                <View style={{ height:4 }}/>
                <Text style={styles.txt01}>Flip</Text>
            </TouchableOpacity>
            <View style={{ height:20 }}/>
            <TouchableOpacity
                onPress={() => { onClick('timer', !timer) }}>
                <View style={styles.v01}></View>
                <View style={{ height:4 }}/>
                <Text style={styles.txt01}>Timer</Text>
            </TouchableOpacity>
            <View style={{ height:20 }}/>
            <TouchableOpacity
                onPress={() => { onClick('flash', !is_flash) }}>
                <View style={styles.v01}></View>
                <View style={{ height:4 }}/>
                <Text style={styles.txt01}>Flash</Text>
            </TouchableOpacity>
        </View>
        
        <View style={styles.containerLeft}>
            <TouchableOpacity
                onPress={() => { onClick('close', true) }}>
                <Text style={styles.txt01}>X</Text>
            </TouchableOpacity>
        </View>
    </>);
};

const styles = StyleSheet.create({
    containerRight: {
        width: '10%',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        right: 6,
        top: 40
    },
    containerLeft: {
        width: '10%',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: 6,
        top: 40
    },
    v01:{
        height:20,
        width:20,
        borderRadius: 100,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    txt01:{
        fontSize:10,
        color:'#fff'
    }
});

export default RightTopMenu;
