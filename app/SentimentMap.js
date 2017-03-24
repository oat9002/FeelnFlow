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
            },
            places: []
        };
        this.onRegionChange = this.onRegionChange.bind(this);
        this.maxPercentEmotion = this.maxPercentEmotion.bind(this);
    }

    maxPercentEmotion(place) {
        let emo = 1;
        let max = parseFloat(place.joy);
        if(max < parseFloat(place.sadness)) {
            max = parseFloat(place.sadness);
            emo = 2;
        }
        if(max < parseFloat(place.fear)) {
            max = parseFloat(place.fear);
            emo = 3;
        }
        if(max < parseFloat(place.anger)) {
            max = parseFloat(place.anger);
            emo = 4;
        }
        if(max < parseFloat(place.disgust)) {
            max = parseFloat(place.disgust);
            emo = 5;
        }
        if(max < parseFloat(place.surprise)) {
            max = parseFloat(place.surprise);
            emo = 6;
        }
        if(max < parseFloat(place.anticipation)) {
            max = parseFloat(place.anticipation);
            emo = 7;
        }
        if(max < parseFloat(place.acceptance)) {
            max = parseFloat(place.acceptance);
            emo = 8;
        }
        switch(emo) {
            case 1:  return {pic: require('./pics/emo_rep/1_joy.png'), background: 'rgba(255, 164, 42, 0.3)'};
            case 2:  return {pic: require('./pics/emo_rep/2_sadness.png'), background: 'rgba(16, 150, 189, 0.3)'};
            case 3:  return {pic: require('./pics/emo_rep/3_fear.png'), background: 'rgba(133, 208, 141, 0.3)'};
            case 4:  return {pic: require('./pics/emo_rep/4_anger.png'), background: 'rgba(255, 67, 63, 0.3)'};
            case 5:  return {pic: require('./pics/emo_rep/5_disgust.png'), background: 'rgba(129, 16, 147, 0.3)'};
            case 6:  return {pic: require('./pics/emo_rep/6_surprise.png'), background: 'rgba(102, 164, 123, 0.3)'};
            case 7:  return {pic: require('./pics/emo_rep/7_anticipation.png'), background: 'rgba(255, 124, 120, 0.3)'};
            case 8:  return {pic: require('./pics/emo_rep/8_acceptance.png'), background: 'rgba(193, 208, 73, 0.3)'};
        }
    }

    componentWillMount() {
        let url = 'http://203.151.85.73:5006/predicted'; 
        fetch(url)
        .then((response) => response.json()) 
        .then((responseJson) => {
            this.setState({
                places: responseJson 
            });
        })
        .catch((error) => { 
            console.error(error); 
        }) 
        this.interval = setInterval(() =>{
            fetch(url)
            .then((response) => response.json()) 
            .then((responseJson) => {
                this.setState({
                    places: responseJson 
                });
            })
            .catch((error) => { 
                console.error(error); 
            }) 
        }
        , 600000);
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
                    {
                        this.state.places.map((p, idx) => (
                            <MapView.Circle 
                                center={{latitude: parseFloat(p.latitude), longitude: parseFloat(p.longitude)}} 
                                radius={100} 
                                fillColor={this.maxPercentEmotion(p).background}
                                key={idx} 
                            />
                        ))
                    }
                    {
                        this.state.places.map((p, idx) => (
                            <MapView.Marker 
                                coordinate={{latitude: parseFloat(p.latitude), longitude: parseFloat(p.longitude)}}
                                centerOffset={{ x: 50, y: 60 }}
                                image={this.maxPercentEmotion(p).pic}
                                key={idx}>
                                <MapView.Callout style={styles.plainView}>
                                    <SentimentCallout 
                                        width={CALLOUT_WIDTH}
                                        joy={p.joy}
                                        sadness={p.sadness}
                                        fear={p.fear}
                                        anger={p.anger}
                                        surprise={p.surprise}
                                        disgust={p.disgust}
                                        anticipation={p.anticipation}
                                        acceptance={p.acceptance}
                                    />
                                </MapView.Callout>
                            </MapView.Marker>
                        ))
                    }

                    {
                        
                    }
                </MapView>
            </View>
        );
    }
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