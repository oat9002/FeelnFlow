/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry,Navigator } from 'react-native';
import Main from './app/Main';
import FlowMap from './app/FlowMap';
import Sentiment from './app/Sentiment';

export default class feeln4 extends Component {
  constructor(props) {
    super(props);
    this.renderScene = this.renderScene.bind(this)
  }

  renderScene(route,navigator) {
    if(route.name == 'Main') {
      return <Main navigator={navigator} route={route}/>
    }
    else if(route.name == 'FlowMap') {
      return <FlowMap navigator={navigator} route={route}/>
    }
    else if(route.name == 'Sentiment') {
      return <Sentiment navigator={navigator} route={route}/>
    }
  }
 
  render() {
    return (
     <Navigator
        initialRoute={{name: 'Main', index: 0}}
        renderScene={this.renderScene}
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
