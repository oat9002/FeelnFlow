import React, { Component } from 'react';
import { View, Text, StyleSheet} from 'react-native';

export default class SentimentCallout extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text style={{fontWeight: 'bold'}}>What they type!</Text>
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
                     <Text style={{color: "rgb(0, 102, 255)"}}>Click to see percentage</Text>
                </View>  
            </View>    
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    line: {
        height: 0.3,
        backgroundColor: 'black'
    },
    emotion_container: {
        flexDirection: 'row',
    }
})
