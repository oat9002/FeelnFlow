import React, { Component } from 'react';
import { View, Text, StyleSheet} from 'react-native';

export default class SentimentCallout extends Component {
    
    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text>How they feel</Text>
                </View>
                <View style={styles.emotion_container}>
                    <Text style={{width: this.props.width * 0.7}}>Joy</Text>
                    <Text style={{width: this.props.width * 0.3, textAlign: 'right'}}>{this.props.joy}%</Text>
                    <View style={styles.line} />
                </View>
                <View style={styles.emotion_container}>
                    <Text style={{width: this.props.width * 0.7}}>Sadness</Text>
                    <Text style={{width: this.props.width * 0.3, textAlign: 'right'}}>{this.props.sadness}%</Text>
                    <View style={styles.line} />
                </View>
                <View style={styles.emotion_container}>
                    <Text style={{width: this.props.width * 0.7}}>Fear</Text>
                    <Text style={{width: this.props.width * 0.3, textAlign: 'right'}}>{this.props.fear}%</Text>
                    <View style={styles.line} />
                </View>
                <View style={styles.emotion_container}>
                    <Text style={{width: this.props.width * 0.7}}>Anger</Text>
                    <Text style={{width: this.props.width * 0.3, textAlign: 'right'}}>{this.props.anger}%</Text>
                    <View style={styles.line} />
                </View>
                <View style={styles.emotion_container}>
                    <Text style={{width: this.props.width * 0.7}}>Disgust</Text>
                    <Text style={{width: this.props.width * 0.3, textAlign: 'right'}}>{this.props.disgust}%</Text>
                    <View style={styles.line} />
                </View>
                <View style={styles.emotion_container}>
                    <Text style={{width: this.props.width * 0.7}}>Surprise</Text>
                    <Text style={{width: this.props.width * 0.3, textAlign: 'right'}}>{this.props.surprise}%</Text>
                    <View style={styles.line} />
                </View>
                <View style={styles.emotion_container}>
                    <Text style={{width: this.props.width * 0.7}}>Anticipation</Text>
                    <Text style={{width: this.props.width * 0.3, textAlign: 'right'}}>{this.props.anticipation}%</Text>
                    <View style={styles.line} />
                </View>
                <View style={styles.emotion_container}> 
                    <Text style={{width: this.props.width * 0.7}}>Acceptance</Text>
                    <Text style={{width: this.props.width * 0.3, textAlign: 'right'}}>{this.props.acceptance}%</Text>
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
