'use strict';

import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight, Navigator } from 'react-native';
import Main from './Main';

export default class MyScene extends Component {
  render() {
    return (
      <View>
        <Text>Hello</Text>

        
      </View>
    )
  }
}



// export default class MyScene extends Component {
//   static get defaultProps() {
//     return {
//       title: 'MyScene'
//     };
//   }

//   render() {
//     return (
//       <View>
//         <Text>Hi! My name is {this.props.title}.</Text>
//       </View>
//     )
//   }
// }

