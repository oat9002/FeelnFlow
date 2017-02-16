import React, { Component } from 'react';
import { View, Text, StyleSheet} from 'react-native';

export default class SentimentCallout extends Component {
    
    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text style={{fontWeight: 'bold'}}>How they feel</Text>
                </View>
                <View style={styles.emotion_container}>
                    <Text style={{width: this.props.width * 0.7, color: 'rgb(255, 164, 42)'}}>Joy</Text>
                    <Text style={{width: this.props.width * 0.3, textAlign: 'right', color: 'rgb(255, 164, 42)'}}>{this.props.joy}%</Text>
                    <View style={styles.line} />
                </View>
                <View style={styles.emotion_container}>
                    <Text style={{width: this.props.width * 0.7, color: 'rgb(16, 150, 189)'}}>Sadness</Text>
                    <Text style={{width: this.props.width * 0.3, textAlign: 'right', color: 'rgb(16, 150, 189)'}}>{this.props.sadness}%</Text>
                    <View style={styles.line} />
                </View>
                <View style={styles.emotion_container}>
                    <Text style={{width: this.props.width * 0.7, color: 'rgb(133, 208, 141)'}}>Fear</Text>
                    <Text style={{width: this.props.width * 0.3, textAlign: 'right', color: 'rgb(133, 208, 141)'}}>{this.props.fear}%</Text>
                    <View style={styles.line} />
                </View>
                <View style={styles.emotion_container}>
                    <Text style={{width: this.props.width * 0.7, color: 'rgb(255, 67, 63)'}}>Anger</Text>
                    <Text style={{width: this.props.width * 0.3, textAlign: 'right', color: 'rgb(255, 67, 63)'}}>{this.props.anger}%</Text>
                    <View style={styles.line} />
                </View>
                <View style={styles.emotion_container}>
                    <Text style={{width: this.props.width * 0.7, color: 'rgb(129, 16, 147)'}}>Disgust</Text>
                    <Text style={{width: this.props.width * 0.3, textAlign: 'right', color: 'rgb(129, 16, 147)'}}>{this.props.disgust}%</Text>
                    <View style={styles.line} />
                </View>
                <View style={styles.emotion_container}>
                    <Text style={{width: this.props.width * 0.7, color: 'rgb(102, 164, 123)'}}>Surprise</Text>
                    <Text style={{width: this.props.width * 0.3, textAlign: 'right', color: 'rgb(102, 164, 123)'}}>{this.props.surprise}%</Text>
                    <View style={styles.line} />
                </View>
                <View style={styles.emotion_container}>
                    <Text style={{width: this.props.width * 0.7, color: 'rgb(255, 124, 120)'}}>Anticipation</Text>
                    <Text style={{width: this.props.width * 0.3, textAlign: 'right', color: 'rgb(255, 124, 120)'}}>{this.props.anticipation}%</Text>
                    <View style={styles.line} />
                </View>
                <View style={styles.emotion_container}> 
                    <Text style={{width: this.props.width * 0.7, color: 'rgb(193, 208, 73)'}}>Acceptance</Text>
                    <Text style={{width: this.props.width * 0.3, textAlign: 'right', color: 'rgb(193, 208, 73)'}}>{this.props.acceptance}%</Text>
                </View>  
            </View>    
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between'
    },
    line: {
        height: 0.3,
        backgroundColor: 'black'
    },
    emotion_container: {
        flexDirection: 'row',
    }
})
