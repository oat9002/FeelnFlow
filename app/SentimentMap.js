'use strict';

import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight, Navigator, Button, StyleSheet, Dimensions, BackAndroid, Platform } from 'react-native';
import PopupDialog, { SlideAnimation, DialogTitle, DialogButton } from 'react-native-popup-dialog';
import MapView from 'react-native-maps'; 
import SentimentCallout from './SentimentCallout';
import SentimentPercentage from './SentimentPercentage';
import { getEmoColorFromEmoText } from './EmoColor';


const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 13.745849; //13.728844053377617;
const LONGITUDE = 100.533315; //100.77809506218118;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;
const CALLOUT_WIDTH = width * 0.7;

export default class SentimentMap extends Component {
    constructor(props) {
        super(props);
        this.maxEmo = [];
        this.state = {
            region: {
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            },
            places: [],
            predicted_texts: [],
            emo_percentage: {
                joy: '',
                sadness: '',
                fear: '',
                anger: '',
                surprise: '',
                disgust: '',
                anticipation: '',
                acceptance: '',
                maxEmo: ''
            }, 
        };
        this.onRegionChange = this.onRegionChange.bind(this);
        this.maxPercentEmotion = this.maxPercentEmotion.bind(this);
        this.getPredictedEmotionSummary = this.getPredictedEmotionSummary.bind(this);
        this.clickCallout = this.clickCallout.bind(this);
        this.revertNumToEmo = this.revertNumToEmo.bind(this);
        this.maxEmoPic = this.maxEmoPic.bind(this);
    }

    maxPercentEmotion(place, maxEmoIdx) {
        let emo = 1;
        if(place.max_emo_list.length > 1) {
            let rand = Math.floor(Math.random * place.max_emo_list.length);
            emo = place.max_emo_list[rand];
        }
        else {
            emo = place.max_emo_list[0];
        }
        this.maxEmo[maxEmoIdx] = emo; 
        return emo;
    }

    maxEmoPic(emo) {
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
        this.getPredictedEmotionSummary();
        this.interval = setInterval(() => {
            this.getPredictedEmotionSummary();
        }
        , 60*1000);
    }

    getPredictedEmotionSummary() {
        let url = 'http://203.151.85.73:5005/predicted'; 
        fetch(url)
        .then((response) => response.json()) 
        .then((responseJson) => {
            this.setState({
                places: responseJson.predicted.predicted 
            });
        })
        .catch((error) => { 
            console.error(error); 
        })
    }

    revertNumToEmo(emo) {
        switch(emo) {
            case 1:  return 'joy';
            case 2:  return 'sadness';
            case 3:  return 'fear';
            case 4:  return 'anger';
            case 5:  return 'disgust';
            case 6:  return 'surprise';
            case 7:  return 'anticipation';
            case 8:  return 'acceptance';
        }
    }

    onRegionChange(region) {
        this.setState({ region });
    }

    clickCallout(emo, idx) {
        let temp = {
            joy: emo.joy,
            sadness: emo.sadness,
            fear: emo.fear,
            anger: emo.anger,
            surprise: emo.surprise,
            disgust: emo.disgust,
            anticipation: emo.anticipation,
            acceptance: emo.acceptance,
            maxEmo: this.revertNumToEmo(this.maxEmo[idx])
        }
        this.setState({emo_percentage: temp, modalVisible: true});
        this.popupDialog.show();
    }

    render() {
        return (
            <View style={styles.container}>
                <MapView 
                    region={this.state.region}
                    style={styles.map}
                    onRegionChange={this.onRegionChange}
                    initialRegion={this.state.region}
                    loadingEnabled={true}>
                    {
                        this.state.places.map((p, idx) => (
                            <MapView.Circle 
                                center={{latitude: parseFloat(p.latitude), longitude: parseFloat(p.longitude)}} 
                                radius={100} 
                                fillColor={this.maxEmoPic(this.maxPercentEmotion(p, idx)).background}
                                key={idx} 
                            />
                        ))
                    }
                    {
                        this.state.places.map((p, idx) => (
                            <MapView.Marker 
                                coordinate={{latitude: parseFloat(p.latitude), longitude: parseFloat(p.longitude)}}
                                image={this.maxEmoPic(this.maxEmo[idx]).pic}
                                key={idx}>
                                <MapView.Callout style={styles.plainView} onPress={()=>{this.clickCallout(p, idx);}}>
                                    <SentimentCallout texts={p.predicted_texts}></SentimentCallout>
                                </MapView.Callout>
                            </MapView.Marker>
                        ))
                    }
                </MapView>
                <PopupDialog
                    ref={(popupDialog) => { this.popupDialog = popupDialog; }}
                    width={0.8}
                    dialogTitle={<DialogTitle title="Feel: " verdict={this.state.emo_percentage.maxEmo.charAt(0).toUpperCase() + this.state.emo_percentage.maxEmo.slice(1)} verdictStyle={{'color': getEmoColorFromEmoText(this.state.emo_percentage.maxEmo)}}/>}
                    actions={[
                        <DialogButton
                            text="CLOSE"
                            onPress={() => {
                                this.popupDialog.dismiss();
                            }}
                            key="button-close-dialog"
                        />,
                    ]}
                >
                    <SentimentPercentage 
                        width={CALLOUT_WIDTH}
                        joy={this.state.emo_percentage.joy}
                        sadness={this.state.emo_percentage.sadness}
                        fear={this.state.emo_percentage.fear}
                        anger={this.state.emo_percentage.anger}
                        surprise={this.state.emo_percentage.surprise}
                        disgust={this.state.emo_percentage.disgust}
                        anticipation={this.state.emo_percentage.anticipation}
                        acceptance={this.state.emo_percentage.acceptance}
                    />
                </PopupDialog>
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