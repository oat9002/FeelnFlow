/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry,Navigator } from 'react-native';
import Main from './app/Main';
import MyScene from './app/MyScene';
//var MyScene = require('./app/MyScene');

export default class feeln4 extends Component {
 
 renderScene(route,navigator){
   if(route.name == 'Main'){
     return <Main navigator={navigator}/>
   }
    if(route.name == 'MyScene'){
     return <MyScene navigator={navigator}/>
   }
 }
 
  render() {
    return (
     <Navigator
        initialRoute={{name: 'Main'}}
        renderScene={this.renderScene.bind(this)}
     />
  
      
    );
  }
}






// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });

AppRegistry.registerComponent('feeln4', () => feeln4);
