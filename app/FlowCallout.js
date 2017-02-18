import React, { Component } from 'react';
import { View, Text, StyleSheet} from 'react-native';

export default class FlowCallout extends Component {
    
    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text style={{fontWeight: 'bold'}}>Place : {this.props.place}</Text>
                </View>
                 <View style={styles.emotion_container}>
                    <Text style={{width: this.props.width * 0.7,fontWeight: 'bold'}}>Current Density : </Text>
                    <Text style={{width: this.props.width * 0.3, textAlign: 'right' ,color: 'rgb(255, 164, 42)'}}>{this.props.currentDensity}</Text>
                </View>
                 <View style={styles.emotion_container}>
                    <Text style={{width: this.props.width * 0.7,fontWeight: 'bold'}}>Next Density : </Text>
                    <Text style={{width: this.props.width * 0.3, textAlign: 'right', color: 'rgb(255, 0, 0)'}}>{this.props.nextDensity}</Text>
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
