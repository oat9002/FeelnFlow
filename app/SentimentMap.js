'use strict';

import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight, Navigator, TouchableOpacity, StyleSheet, Dimensions, BackAndroid, Platform } from 'react-native';
import MapView from 'react-native-maps'; 
import SentimentCallout from './SentimentCallout';


const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 13.747784; //13.728844053377617;
const LONGITUDE = 100.535947; //100.77809506218118;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;
const CALLOUT_WIDTH = 200;

export default class SentimentMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            region: {
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            }
        };
        this.onRegionChange = this.onRegionChange.bind(this);
    }

    onRegionChange(region) {
        this.setState({ region });
    }

    render() {
        return (
            <View style={styles.container}>
                <MapView 
                    region={this.state.region}
                    style={styles.map}
                    onRegionChange={this.onRegionChange}
                    initialRegion={this.state.region}>
                    <MapView.Circle
                        center={circle.center} 
                        radius={circle.radius} 
                        fillColor="rgba(255, 236, 94, 0.5)" 
                    />
                    <MapView.Marker 
                        coordinate={circle.center}
                        centerOffset={{ x: 10, y: 60 }}
                        anchor={{ x: 0.69, y: 1 }}
                        image={require('./pics/emo_black.png')}>
                        <MapView.Callout style={styles.plainView}>
                            <SentimentCallout 
                                width={CALLOUT_WIDTH}
                                joy={8}
                                sadness={40}
                                fear={5}
                                anger={10}
                                surprise={23}
                                disgust={4}
                                anticipation={1}
                                acceptance={20}
                            />
                        </MapView.Callout>
                    </MapView.Marker>
                </MapView>
            </View>
        );
    }
}

const circle = {
    center: {
        latitude:  13.746784,
        longitude: 100.534947,
    },
    radius: 100
}


const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    latlng: {
        width: 200,
        alignItems: 'stretch',
    },
    plainView: {
        width: CALLOUT_WIDTH,
    },
});