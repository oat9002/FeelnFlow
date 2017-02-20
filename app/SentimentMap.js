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
        let max = place.joy;
        if(max < place.sadness) {
            max = place.sadness
            emo = 2
        }
        if(max < place.fear) {
            max = place.fear
            emo = 3
        }
        if(max < place.anger) {
            max = place.anger
            emo = 4
        }
        if(max < place.disgust) {
            max = place.disgust
            emo = 5
        }
        if(max < place.surprise) {
            max = place.surprise
            emo = 6
        }
        if(max < place.anticipation) {
            max = place.anticipation
            emo = 7
        }
        if(max < place.acceptance) {
            max = place.acceptance
            emo = 8
        }
        switch(emo) {
            case 1:  return require('./pics/emo_rep/1.png');
            case 2:  return require('./pics/emo_rep/2.png');
            case 3:  return require('./pics/emo_rep/3.png');
            case 4:  return require('./pics/emo_rep/4.png');
            case 5:  return require('./pics/emo_rep/5.png');
            case 6:  return require('./pics/emo_rep/6.png');
            case 7:  return require('./pics/emo_rep/7.png');
            case 8:  return require('./pics/emo_rep/8.png');
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
                                fillColor="rgba(255, 236, 94, 0.5)"
                                key={idx} 
                            />
                        ))
                    }
                    {
                        this.state.places.map((p, idx) => (
                            <MapView.Marker 
                                    coordinate={{latitude: parseFloat(p.latitude), longitude: parseFloat(p.longitude)}}
                                    centerOffset={{ x: 50, y: 60 }}
                                    image={this.maxPercentEmotion(p)}
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