'use strict';

import React, { Component, PropTypes } from 'react';
import { StyleSheet, View , Text , Image ,Navigator, TouchableOpacity} from 'react-native';
// import { BlurView, VibrancyView } from 'react-native-blur';
// import { Container, Content} from 'native-base';
import Button from './Button'
import FlowMap from './FlowMap';

class Main extends Component {
 navigate(routeName){
   this.props.navigator.push({
      name: routeName,
      index: this.props.index + 1
   })
 }

 render() {
    return (
      <Image source={require("./pics/bg_croped_blur.png")} style={styles.container}>
        <View style={[styles.center, {marginRight: 30, marginTop: 20}]}>
          <Text style={[styles.title, styles.basefont]}>FEELN4</Text>
        </View>
        <View style={[styles.center, {flexDirection: 'row'}]}>
          <Image source={require("./pics/people_white.png")}></Image>
          <Image source={require("./pics/emo_white.png")}></Image>
        </View>
        <View style={styles.buttonView}>
          <View>
            <Button onPress={this.navigate.bind(this,'Sentiment')} title="Sentiment"></Button>
          </View>
          <View style={{marginTop: 10}}>
            <Button onPress={this.navigate.bind(this,'FlowMap')} title="Crowd Flow"></Button>
          </View>
        </View>
      </Image>
    );
  } 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'stretch',
    width: undefined,
    height: undefined,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,55,72, 0.3)'
  },
  basefont: {
    fontFamily: 'Open Sans'
  },
  title: {
    marginLeft: 30,
    marginTop: 50,
    fontSize: 60,
    fontWeight: 'bold',
    color: 'black'
  },
  second_title: {
    marginLeft: 30,
    fontSize: 24,
    color: 'black'
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonView: {
    marginBottom: 60,
    marginHorizontal: 100,
  },
});

export default Main;
