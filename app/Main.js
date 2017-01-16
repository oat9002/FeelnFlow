'use strict';

import React, { Component, PropTypes } from 'react';
import { StyleSheet, View , Text , Image , Button,Navigator, TouchableOpacity} from 'react-native';
// import { BlurView, VibrancyView } from 'react-native-blur';
// import { Container, Content} from 'native-base';

class Main extends React.Component {
 render() {
    return (
      <Navigator
          renderScene={this.renderScene.bind(this)}
          navigator={this.props.navigator}
        //  navigationBar={
           // <Navigator.NavigationBar style={{backgroundColor: '#246dd5', alignItems: 'center'}}
               // routeMapper={NavigationBarRouteMapper} />
         // } 
         />
    );
  }

    renderScene(route, navigator) {
    return (
      <Image source={require("./pics/bg_croped_blur.png")} style={styles.container}>
        <View>
          <Text style={[styles.title, styles.basefont]}>feeln4</Text>
          <Text style={[styles.second_title, styles.basefont]}>Sentimental & Crowd Flow</Text>
          <Text style={[styles.second_title, styles.basefont]}>Prediction</Text>
          <Text style={[styles.second_title, styles.basefont]}>System</Text>
        </View>
        <View style={[styles.center, {flexDirection: 'row'}]}>
          <Image source={require("./pics/people_white.png")}></Image>
          <Image source={require("./pics/emo_white.png")}></Image>
        </View>
        <View style={styles.button}>
          <View>
            <Button title="Sentiment"></Button>
          </View>
          <View style={{marginTop: 10}}>
            <Button  onPress={this.gotoNext.bind(this)} title="Crowd Flow"></Button>
          </View>
        </View>
      </Image>


    );
  }
  gotoNext() {
    navigator.push({
      id: 'MyScene',
     // name: '主页',
    });
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
  button: {
    marginBottom: 60,
    marginHorizontal: 100
  }
});

export default Main;
