import React, { Component } from 'react';
import { View, Text, TouchableHighlight, Navigator, TouchableOpacity, StyleSheet, Dimensions, BackAndroid, Platform } from 'react-native';
import SentimentMap from './SentimentMap';
import SentimentDrawer from './SentimentDrawer';
import Hamburger from 'react-native-hamburger';
import Drawer from 'react-native-drawer';


export default class Sentiment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drawer: false,
            active: false
        }
    }

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
                <Drawer 
                    type="static"
                    open={this.state.drawer}
                    content={<SentimentDrawer />}
                    tapToClose={true}
                    openDrawerOffset={0.5} // 20% gap on the right side of drawer
                    panCloseMask={0.2}
                    closedDrawerOffset={-3}
                   >
                        <SentimentMap />
                        <Hamburger 
                        active = {this.state.active}
                        type='cross'
                        onPress={() => {
                            this.setState({
                                drawer: !this.state.drawer,
                                active: !this.state.active
                            })
                        }} 
                        />
                </Drawer>
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1
    },
    
})