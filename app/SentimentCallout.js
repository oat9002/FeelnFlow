import React, { Component } from 'react';
import { View, Text, StyleSheet, Image} from 'react-native';

export default class SentimentCallout extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.Topic}>
                    <Image style={{height: 30, width: 30}} source={require('./pics/twitter.png')} />
                    <Text style={{fontWeight: 'bold', fontSize: 16}}>   Twitter</Text>
                </View>
                <View style={styles.emotion_container}>
                    { 
                        this.props.texts.length != 0 ? (
                            this.props.texts.map((t, idx) => (
                                <Text key={idx}>{t}</Text>
                            ))  
                        ) : (
                            <Text>There is no exmaple texts. Please wait.</Text>
                        )  
                    }
                </View>
                <View>
                    <Text style={{color: "rgb(0, 89, 255)"}}>Click to see percentage</Text>
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
    },
    Topic: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    }
})
