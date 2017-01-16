'use strict';

import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight, Navigator, TouchableOpacity, StyleSheet,  Dimensions, } from 'react-native';
import Main from './Main';
import MapView from 'react-native-maps';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let id = 0;

function randomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}


export default class MyScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      markers: [],
    };
    this.onRegionChange = this.onRegionChange.bind(this) //อย่าลืมประกาศทุกฟังก์ชั่นนะ
     this. onMapPress = this. onMapPress.bind(this)
  }

  
  onRegionChange(region) {
    this.setState({ region });
  }

    onMapPress(e) {
    this.setState({
      markers: [
        ...this.state.markers,
        {
          coordinate: e.nativeEvent.coordinate,
          key: id++,
          color: randomColor(),
        },
      ],
    });
  }

  render() {
    return (
   <View style={styles.container}>
        <MapView
          provider={this.props.provider}
          style={styles.map}
          initialRegion={this.state.region}
          onPress={(e) => this.onMapPress(e)}
        >
          {this.state.markers.map(marker => (
            <MapView.Marker
              key={marker.key}
              coordinate={marker.coordinate}
              pinColor={marker.color}
            />
          ))}
        </MapView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => this.setState({ markers: [] })}
            style={styles.bubble}
          >
            <Text>Tap to create a marker of random color</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
}
}

const styles = StyleSheet.create({
  container: {
     ...StyleSheet.absoluteFillObject,
   height: 550,
   width: 550,
   justifyContent: 'flex-end',
   alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
   map: {
   ...StyleSheet.absoluteFillObject,
 },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
});



