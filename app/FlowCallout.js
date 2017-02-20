import React, { Component } from 'react';
import { View, Text, StyleSheet} from 'react-native';

export default class FlowCallout extends Component {
    
    changeColorText(){

    }


    render() {
        let currentDen
        if(this.props.currentDensity=='LOW'){
            currentDen = (
                <Text style={{width: this.props.width * 0.3, textAlign: 'right' ,color: 'rgb(0, 200, 0)'}}>{this.props.currentDensity}</Text>
            )

        }
        else if(this.props.currentDensity=='MEDIUM'){
             currentDen = (
                <Text style={{width: this.props.width * 0.3, textAlign: 'right' ,color: 'rgb(255, 255, 0)'}}>{this.props.currentDensity}</Text>
            )

        }
        else{
             currentDen = (
                <Text style={{width: this.props.width * 0.3, textAlign: 'right' ,color: 'rgb(200, 0, 0)'}}>{this.props.currentDensity}</Text>
            )
        }
        
        let nextDen
        if(this.props.nextDensity=='LOW'){
            nextDen = (
                <Text style={{width: this.props.width * 0.3, textAlign: 'right' ,color: 'rgb(0, 200, 0)'}}>{this.props.nextDensity}</Text>
            )

        }
        else if(this.props.nextDensity=='MEDIUM'){
             nextDen = (
                <Text style={{width: this.props.width * 0.3, textAlign: 'right' ,color: 'rgb(255, 255, 0)'}}>{this.props.nextDensity}</Text>
            )

        }
        else{
             nextDen = (
                <Text style={{width: this.props.width * 0.3, textAlign: 'right' ,color: 'rgb(200, 0, 0)'}}>{this.props.nextDensity}</Text>
            )
        }

        return (
            <View style={styles.container}>
                <View>
                    <Text style={{fontWeight: 'bold'}}>Place : {this.props.place}</Text>
                </View>
                 <View style={styles.emotion_container}>
                    <Text style={{width: this.props.width * 0.7,fontWeight: 'bold'}}>Current Density : </Text>
                    {currentDen}
                </View>
                 <View style={styles.emotion_container}>
                    <Text style={{width: this.props.width * 0.7,fontWeight: 'bold'}}>Next Density : </Text>
                    {nextDen}
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
