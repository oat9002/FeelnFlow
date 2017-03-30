import React, { Component } from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { getEmoColorFromEmoText } from './EmoColor';

export default class SentimentPercentage extends Component {
    
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.emotion_container}>
                    <Text style={{width: this.props.width * 0.7, color: getEmoColorFromEmoText('joy')}}>Joy</Text>
                    <Text style={{width: this.props.width * 0.3, textAlign: 'right', color: getEmoColorFromEmoText('joy')}}>{this.props.joy}%</Text>
                </View>
                <View style={styles.emotion_container}>
                    <Text style={{width: this.props.width * 0.7, color: getEmoColorFromEmoText('sadness')}}>Sadness</Text>
                    <Text style={{width: this.props.width * 0.3, textAlign: 'right', color: getEmoColorFromEmoText('sadness')}}>{this.props.sadness}%</Text>
                </View>
                <View style={styles.emotion_container}>
                    <Text style={{width: this.props.width * 0.7, color: getEmoColorFromEmoText('fear')}}>Fear</Text>
                    <Text style={{width: this.props.width * 0.3, textAlign: 'right', color: getEmoColorFromEmoText('fear')}}>{this.props.fear}%</Text>
                </View>
                <View style={styles.emotion_container}>
                    <Text style={{width: this.props.width * 0.7, color: getEmoColorFromEmoText('anger')}}>Anger</Text>
                    <Text style={{width: this.props.width * 0.3, textAlign: 'right', color: getEmoColorFromEmoText('anger')}}>{this.props.anger}%</Text>
                </View>
                <View style={styles.emotion_container}>
                    <Text style={{width: this.props.width * 0.7, color: getEmoColorFromEmoText('disgust')}}>Disgust</Text>
                    <Text style={{width: this.props.width * 0.3, textAlign: 'right', color: getEmoColorFromEmoText('disgust')}}>{this.props.disgust}%</Text>
                </View>
                <View style={styles.emotion_container}>
                    <Text style={{width: this.props.width * 0.7, color: getEmoColorFromEmoText('surprise')}}>Surprise</Text>
                    <Text style={{width: this.props.width * 0.3, textAlign: 'right', color: getEmoColorFromEmoText('surprise')}}>{this.props.surprise}%</Text>
                </View>
                <View style={styles.emotion_container}>
                    <Text style={{width: this.props.width * 0.7, color: getEmoColorFromEmoText('anticipation')}}>Anticipation</Text>
                    <Text style={{width: this.props.width * 0.3, textAlign: 'right', color: getEmoColorFromEmoText('anticipation')}}>{this.props.anticipation}%</Text>
                </View>
                <View style={styles.emotion_container}> 
                    <Text style={{width: this.props.width * 0.7, color: getEmoColorFromEmoText('acceptance')}}>Acceptance</Text>
                    <Text style={{width: this.props.width * 0.3, textAlign: 'right', color: getEmoColorFromEmoText('acceptance')}}>{this.props.acceptance}%</Text>
                </View>  
            </View>    
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        marginLeft: 20,
        marginTop: 10
    },
    line: {
        height: 0.3,
        backgroundColor: 'black'
    },
    emotion_container: {
        flexDirection: 'row',
    }
})
