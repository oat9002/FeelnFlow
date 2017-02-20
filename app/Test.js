import React, { Component } from 'react';
import { View, Text, StyleSheet} from 'react-native';
import api from './api';

export default class Test extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            density: "loading..."
        }
    }

    componentWillMount(){
  
        var url = 'http://203.151.85.73:5050/crowdflow/density?time=NOW&ll=13.746118609021641,100.53312443782482';
        fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
            let denArr =[]
            denArr = responseJson.density
            let densityValue = denArr[0].density
            this.setState({
                density: densityValue
            }) 
        })
        .catch((error) => {
            console.error(error);
        })
        }

    render() {
        return (
            <View style={styles.container}>
               
                     <Text style={{fontWeight: 'bold'}}>{this.state.density}</Text>
                    
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
