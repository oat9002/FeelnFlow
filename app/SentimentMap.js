'use strict';

import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight, Navigator, Button, StyleSheet, Dimensions, BackAndroid, Platform } from 'react-native';
import PopupDialog, { SlideAnimation, DialogTitle, DialogButton } from 'react-native-popup-dialog';
import MapView from 'react-native-maps'; 
import SentimentCallout from './SentimentCallout';
import SentimentPercentage from './SentimentPercentage';


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
                angry: '',
                surprise: '',
                disgust: '',
                anticipation: '',
                acceptance: ''
            }, 
        };
        this.onRegionChange = this.onRegionChange.bind(this);
        this.maxPercentEmotion = this.maxPercentEmotion.bind(this);
        this.getPredictedEmotionSummary = this.getPredictedEmotionSummary.bind(this);
        this.getSampleTextFromServer = this.getSampleTextFromServer.bind(this);
        this.clickCallout = this.clickCallout.bind(this);
    }

    maxPercentEmotion(place) {
        let emo = 1;
        let maxEmo = [];
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
            case 1:  return {pic: require('./pics/emo_rep/new/1_joy.png'), background: 'rgba(255, 164, 42, 0.3)'};
            case 2:  return {pic: require('./pics/emo_rep/new/2_sadness.png'), background: 'rgba(16, 150, 189, 0.3)'};
            case 3:  return {pic: require('./pics/emo_rep/new/3_fear.png'), background: 'rgba(133, 208, 141, 0.3)'};
            case 4:  return {pic: require('./pics/emo_rep/new/4_anger.png'), background: 'rgba(255, 67, 63, 0.3)'};
            case 5:  return {pic: require('./pics/emo_rep/new/5_disgust.png'), background: 'rgba(129, 16, 147, 0.3)'};
            case 6:  return {pic: require('./pics/emo_rep/new/6_surprise.png'), background: 'rgba(102, 164, 123, 0.3)'};
            case 7:  return {pic: require('./pics/emo_rep/new/7_anticipation.png'), background: 'rgba(255, 124, 120, 0.3)'};
            case 8:  return {pic: require('./pics/emo_rep/new/8_acceptance.png'), background: 'rgba(193, 208, 73, 0.3)'};
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
            // this.getSampleTextFromServer(responseJson.predicted.id);
            this.setState({
                places: responseJson.predicted.predicted 
            });
        })
        .catch((error) => { 
            console.error(error); 
        })
    }

    getSampleTextFromServer(predictedId) {
        let url = 'http://203.151.85.73:5005/sample_text?predicted_id=' + predictedId;
        fetch(url)
        .then((response) => response.json()) 
        .then((responseJson) => {
            this.setState({
                predicted_texts: responseJson.predicted_texts
            });
        })
        .catch((error) => { 
            console.error(error); 
        }) 
    }

    getSampleText(latitude, longitude) {
        if(this.state.predicted_texts.predicted_texts != null) {
            this.state.predicted_texts.predicted_texts.map((inst, idx) => {
                if(inst.latitude == latitude && inst.longitude == longitude) {
                    return inst.showed_texts;
                }
            });
        }
        else {
           return ['no'];
        }
    }

    onRegionChange(region) {
        this.setState({ region });
    }

    clickCallout(emo) {
        let temp = {
            joy: emo.joy,
            sadness: emo.sadness,
            fear: emo.fear,
            angry: emo.anger,
            surprise: emo.surprise,
            disgust: emo.disgust,
            anticipation: emo.anticipation,
            acceptance: emo.acceptance
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
                                fillColor={this.maxPercentEmotion(p).background}
                                key={idx} 
                            />
                        ))
                    }
                    {
                        this.state.places.map((p, idx) => (
                            <MapView.Marker 
                                coordinate={{latitude: parseFloat(p.latitude), longitude: parseFloat(p.longitude)}}
                                image={this.maxPercentEmotion(p).pic}
                                key={idx}>
                                <MapView.Callout style={styles.plainView} onPress={()=>{this.clickCallout(p);}}>
                                    <SentimentCallout texts={p.predicted_texts}></SentimentCallout>
                                </MapView.Callout>
                            </MapView.Marker>
                        ))
                    }

                    {
                        
                    }
                </MapView>
                <PopupDialog
                    ref={(popupDialog) => { this.popupDialog = popupDialog; }}
                    width={0.8}
                    dialogTitle={<DialogTitle title="How they feel" />}
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
                        angry={this.state.emo_percentage.angry}
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