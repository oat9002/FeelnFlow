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
import FlowCallout from './FlowCallout';

import api from './api'



const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 13.747784;//13.728844053377617;
const LONGITUDE = 100.535947;//100.77809506218118;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;
let id = 0;
const CALLOUT_WIDTH = 200;


export default class FlowMap extends Component {
  constructor(props) {
    super(props);
    this.density =  ["","","","",""] 
    this.placeName = ["Siam Center","Siam Discovery","MBK Center","CentralWorld","Siam Paragon "]
    this.ll =  ["13.746118609021641,100.53312443782482","13.746753840963278,100.53132812725471","13.744888431893822,100.53014708594891","13.746307025032005,100.53976065447212","13.74601902837004,100.53435495832393"]
    this.denColor = ["rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)"] ,
    this.denStrokeColor = ["rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)"] 
    this.nextDensity = ["","","","",""] 
    this.state = {
      
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      
    };
     this.onRegionChange = this.onRegionChange.bind(this) //อย่าลืมประกาศทุกฟังก์ชั่นนะ
     this.onChangeDenColor = this.onChangeDenColor.bind(this)
     this.llToCenter = this.llToCenter.bind(this)
  }

  
    onRegionChange(region) {
      this.setState({ region });
     
    }

    onChangeDenColor(densityValue){
      //this.setState({denColor})
      if(densityValue == 'LOW'){
          return {
          denColor: "rgba(0, 200, 0, 0.5)",
          denStrokeColor : "rgba(0, 200, 0, 0.9)" 
        }
      }
      if(densityValue == 'MEDIUM'){
          return{
          denColor: "rgba(255, 255, 0, 0.5)",
          denStrokeColor : "rgba(255, 255, 0, 0.9)" 
        }
      }
      if(densityValue == 'HIGH'){
         return{
          denColor: "rgba(200,0,0,0.5)",
          denStrokeColor : "rgba(200, 200, 0, 0.9)" 
        }
      }
    }

    llToCenter(ll){
      let llSplit = [];
      llSplit = ll.split(",");
      return ({
        latitude: parseFloat(llSplit[0]),
        longitude: parseFloat(llSplit[1])
      });
    }

    
    componentWillMount() {

       for(let i=0;i<this.ll.length;i++){
        
          let url = 'http://203.151.85.73:5050/crowdflow/density?time=NOW&ll='+this.ll[i];
          fetch(url)
          .then((response) => response.json())
          .then((responseJson) => {
              let denArr =[]
              denArr = responseJson.density
              this.density[i] = denArr[0].density
              let colorJson = this.onChangeDenColor(this.density[i])          
              this.denColor[i] = colorJson.denColor
              this.denStrokeColor[i] = colorJson.denStrokeColor
              
          })
          .catch((error) => {
              console.error(error);
          })

        }
         for(let i=0;i<this.ll.length;i++){
        
          let url = 'http://203.151.85.73:5050/crowdflow/density?time=5MIN&ll='+this.ll[i];
          fetch(url)
          .then((response) => response.json())
          .then((responseJson) => {
              let denArr =[]
              denArr = responseJson.density
              this.nextDensity[i] = denArr[0].density
            })
          .catch((error) => {
              console.error(error);
          })

        }

       

    }
  
render() {
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
              coordinates={polygonParagon.coordinates}
              fillColor=  {this.denColor[4]}
              strokeColor={this.denStrokeColor[4]}
              strokeWidth={2} //ความหนาของเส้นรอบรูป
              //onPress={this.recordEvent('polygonParagon::onPress')}
                          
            />
            <MapView.Marker //Paragon
              coordinate={this.llToCenter(this.ll[4])}
                        centerOffset={{ x: 10, y: 60 }}
                        anchor={{ x: 0.69, y: 1 }}
                        image={require('./pics/increase_arrow.png')}>
                        <MapView.Callout style={styles.plainView}>
                            <FlowCallout 
                                width={CALLOUT_WIDTH}
                                place = {this.placeName[4]}
                                currentDensity = {this.density[4]}
                                nextDensity = {this.nextDensity[4]}

                            />
                        </MapView.Callout>
             </MapView.Marker>  


             

            <MapView.Polygon
              coordinates={polygonSiamCenter.coordinates}
              fillColor={this.denColor[0]}
              strokeColor={this.denStrokeColor[0]}
              strokeWidth={2} //ความหนาของเส้นรอบรูป
            />

            <MapView.Marker 
                        coordinate = {this.llToCenter(this.ll[0])}
                        centerOffset={{ x: 10, y: 60 }}
                        anchor={{ x: 0.69, y: 1 }}
                      
                        image={require('./pics/decrease_arrow.png')}>
                        <MapView.Callout style={styles.plainView}>
                            <FlowCallout 
                                width={CALLOUT_WIDTH}
                                place = {this.placeName[0]}
                                currentDensity = {this.density[0]}
                                nextDensity = {this.nextDensity[0]}

                            />
                        </MapView.Callout>
              </MapView.Marker>

             <MapView.Polygon
              coordinates={polygonMBK.coordinates}
              fillColor={this.denColor[2]}
              strokeColor={this.denStrokeColor[2]}
              strokeWidth={2} //ความหนาของเส้นรอบรูป
            />
            <MapView.Marker 
                        coordinate = {this.llToCenter(this.ll[2])}
                        centerOffset={{ x: 10, y: 60 }}
                        anchor={{ x: 0.69, y: 1 }}
                      
                        image={require('./pics/decrease_arrow.png')}>
                        <MapView.Callout style={styles.plainView}>
                            <FlowCallout 
                                width={CALLOUT_WIDTH}
                                place = {this.placeName[2]}
                                currentDensity = {this.density[2]}
                                nextDensity = {this.nextDensity[2]}

                            />
                        </MapView.Callout>
            </MapView.Marker>

            <MapView.Polygon
              coordinates={polygonSiamDis.coordinates}
              fillColor={this.denColor[1]}
              strokeColor={this.denStrokeColor[1]}
              strokeWidth={2} //ความหนาของเส้นรอบรูป
            />
            <MapView.Marker 
                  coordinate = {this.llToCenter(this.ll[1])}
                  centerOffset={{ x: 10, y: 60 }}
                  anchor={{ x: 0.69, y: 1 }}
                  image={require('./pics/decrease_arrow.png')}>
                  <MapView.Callout style={styles.plainView}>
                      <FlowCallout 
                          width={CALLOUT_WIDTH}
                          place = {this.placeName[1]}
                          currentDensity = {this.density[1]}
                          nextDensity = {this.nextDensity[1]}

                      />
                  </MapView.Callout>
            </MapView.Marker>
                 <MapView.Polygon
              coordinates={polygonCentralWorld.coordinates}
              fillColor={this.denColor[3]}
              strokeColor={this.denStrokeColor[3]}
              strokeWidth={2} //ความหนาของเส้นรอบรูป
            />
            <MapView.Marker 
                        coordinate = {this.llToCenter(this.ll[3])}
                        centerOffset={{ x: 10, y: 60 }}
                        anchor={{ x: 0.69, y: 1 }}
                      
                        image={require('./pics/decrease_arrow.png')}>
                        <MapView.Callout style={styles.plainView}>
                            <FlowCallout 
                                width={CALLOUT_WIDTH}
                                place = {this.placeName[3]}
                                currentDensity = {this.density[3]}
                                nextDensity = {this.nextDensity[3]}

                            />
                        </MapView.Callout>
                </MapView.Marker>
          </MapView>
          
          
    </View>
    

    
    );
}
}

FlowMap.propTypes = {
  provider: MapView.ProviderPropType,
};

const circle = {
    center: {
        latitude:  13.746784,
        longitude: 100.534947,
    },
    radius: 100
}
const siamDis = {
    coordinate: {
        latitude: 13.746570,
        longitude: 100.531453,
    }
    
}



 const polygonParagon = {
      coordinates : [
        { 
          latitude: 13.747784 ,
          longitude: 100.535947
        },
        {
          latitude: 13.745545,
          longitude: 100.535503
        },
        {
          latitude: 13.745864,
          longitude: 100.533953
        },
        {
          latitude: 13.748057,
          longitude: 100.534392
        },
      ]
  }
  const polygonCentralWorld = {
        coordinates : [
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
  }
   const  polygonSiamCenter = {
     coordinates : [
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
   }
     const polygonMBK = { 
       coordinates :[
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
      ]
     }
     const polygonSiamDis = {
        coordinates : [
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
    }

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
   plainView: {
        width: CALLOUT_WIDTH,
    },
 
 

});



