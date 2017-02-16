import React, { Component } from 'react';
import { View, Text, TouchableHighlight, Navigator, TouchableOpacity, StyleSheet, Dimensions, BackAndroid, Platform } from 'react-native';
import SentimentMap from './SentimentMap';
import Hamburger from 'react-native-hamburger';
import Drawer from 'react-native-drawer';


export default class Sentiment extends Component {

    componentWillUnmount() {
        BackAndroid.addEventListener('hardwareBackPress', () => {
            if(Platform.OS === "android" && this.props.route.index > 0) {
                this.props.navigator.pop();
            }
        })
    }    

    render() {
        return (
            <View style={style.container}>
                <SentimentMap />
                <Hamburger active = {false} type='cross' />
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1
    },
    
})