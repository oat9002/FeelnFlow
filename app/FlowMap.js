'use strict';

import React, { Component, PropTypes } from 'react';
import { 
   View,
   Text, 
   TouchableHighlight, 
   Navigator, 
   TouchableOpacity, 
   StyleSheet, 
   Dimensions,
  DrawerLayoutAndroid, 
  ToolbarAndroid} from 'react-native';
import Main from './Main';
import MapView from 'react-native-maps';



const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 13.747784;//13.728844053377617;
const LONGITUDE = 100.535947;//100.77809506218118;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;
let id = 0;


export default class FlowMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      polygonParagon: [
        {
          latitude: 13.747784 ,//LATITUDE + SPACE,
          longitude: 100.535947//LONGITUDE + SPACE,
        },
        {
          latitude: 13.745545,//LATITUDE - SPACE,
          longitude: 100.535503//LONGITUDE - SPACE,
        },
        {
          latitude: 13.745864,//LATITUDE - SPACE,
          longitude: 100.533953//LONGITUDE + SPACE,
        },
        {
          latitude: 13.748057,//LATITUDE - SPACE,
          longitude: 100.534392//LONGITUDE + SPACE,
        },
         
      ],
      polygonCentralWorld: [
        {
          latitude: 13.747930 ,
          longitude: 100.540131
        },
        {
          latitude: 13.744852 ,
          longitude: 100.539687
        },
        {
          latitude: 13.745076 ,
          longitude: 100.538538
        },
        {
          latitude: 13.746383 ,
          longitude: 100.538659
        },
        {
          latitude: 13.746501 ,
          longitude: 100.538091
        },
        {
          latitude: 13.748188 ,
          longitude: 100.538364
        },


      ],
      polygonSiamCenter: [
        {
          latitude: 13.746368 ,
          longitude: 100.533590
        },
        {
          latitude: 13.745884 ,
          longitude: 100.533505
        },
        {
          latitude: 13.746201 ,
          longitude: 100.531992
        },
        {
          latitude: 13.746659 ,
          longitude: 100.532084
        },
      ],
      polygonMBK: [
        {
           latitude: 13.743162,
           longitude:100.529276
        },
        {
           latitude: 13.743030,
           longitude: 100.530086
        },
        {
           latitude: 13.745630,
           longitude: 100.530477
        },
        {
           latitude: 13.745990,
           longitude: 100.530183
        },
        {
           latitude: 13.745990,
           longitude: 100.530183
        },
        {
           latitude: 13.746050, 
           longitude: 100.529724
        },
      ],
      polygonSiamDis: [
         {
           latitude: 13.746793, 
           longitude: 100.531030 
        },
         {
           latitude: 13.746312,
           longitude:  100.531381
        },
         {
           latitude: 13.746236, 
           longitude: 100.531821
        },
         {
           latitude: 13.746709,
           longitude:  100.531917
        },
         {
           latitude: 13.746959,
           longitude:  100.531718
        },
          {
           latitude: 13.747057,
           longitude:  100.531084
        },
        

      ],
      
      
    };
     this.onRegionChange = this.onRegionChange.bind(this) //อย่าลืมประกาศทุกฟังก์ชั่นนะ
     // this.recordEvent = this.recordEvent.bind(this)
     // this.onActionSelected = this.onActionSelected.bind(this)
  }

  
    onRegionChange(region) {
      this.setState({ region });
    }
    // makeEvent(e, name) {
    //     return {
    //       id: id++,
    //       name,
    //       data: e.nativeEvent ? e.nativeEvent : e,
    //     };
    //   }
    // recordEvent(name) {
    //   return e => {
    //      if (e instanceof SyntheticEvent && typeof e.persist === 'function') {
    //      e.persist();
    //    }
    //    this.setState(prevState => ({
    //       events: [
    //         this.makeEvent(e, name),
    //         ...prevState.events.slice(0, 10),
    //       ],
       
    //  }));
    //   };
    // }
 
    



  render() {

    const {polygonParagon} = this.state;
    const {polygonCentralWorld} = this.state;
    const {polygonSiamCenter} = this.state;
    const {polygonMBK} = this.state;
    const {polygonSiamDis} = this.state;
    return (
         
      <View style={styles.container}>
        <MapView
          region={this.state.region}
          style={styles.map}
          onRegionChange={this.onRegionChange}
          initialRegion={this.state.region}
        // initialRegion={region}
          >
             <MapView.Polygon
              coordinates={polygonParagon}
              fillColor="rgba(200, 0, 0, 0.5)"
              strokeColor="rgba(200,0,0,0.9)"
              strokeWidth={2} //ความหนาของเส้นรอบรูป
              //onPress={this.recordEvent('polygonParagon::onPress')}
                          
            />

            <MapView.Polygon
              coordinates={polygonCentralWorld}
              fillColor="rgba(0, 200, 0, 0.5)"
              strokeColor="rgba(0,200,0,0.9)"
              strokeWidth={2} //ความหนาของเส้นรอบรูป
            />
            

            <MapView.Polygon
              coordinates={polygonSiamCenter}
              fillColor="rgba(0, 200, 0, 0.5)"
              strokeColor="rgba(0,200,0,0.9)"
              strokeWidth={2} //ความหนาของเส้นรอบรูป
            />
             <MapView.Polygon
              coordinates={polygonMBK}
              fillColor="rgba(255, 255, 0, 0.5)"
              strokeColor="rgba(255,255,0,0.9)"
              strokeWidth={2} //ความหนาของเส้นรอบรูป
            />
            <MapView.Polygon
              coordinates={polygonSiamDis}
              fillColor="rgba(0, 200, 0, 0.5)"
              strokeColor="rgba(0,200,0,0.9)"
              strokeWidth={2} //ความหนาของเส้นรอบรูป
            />
          </MapView>
        
    </View>
    

    
    );
}
}

FlowMap.propTypes = {
  provider: MapView.ProviderPropType,
};



const styles = StyleSheet.create({
  container: {
     ...StyleSheet.absoluteFillObject,
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
   bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },

});



