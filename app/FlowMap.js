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
  ToolbarAndroi,
} from 'react-native';
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
    this.density =  ["","","","","","","","","","","",""] 
    this.denColor = ["rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)"] ,
    this.denStrokeColor = ["rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)"] 
    this.nextDensity = ["","","","","",""] 
    this.places =[]
    //this.nextPlace = []
    this.checkNextPlace = [true,false,false,false,false,false,false,false,false,false,false,false]
    this.state = {
      
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      test: "1234",
      nextPlaces : ["None","None","None","None","None","None","None","None","None","None","None","None"]
     
      
    };
     this.onRegionChange = this.onRegionChange.bind(this) //อย่าลืมประกาศทุกฟังก์ชั่นนะ
     this.onChangeDenColor = this.onChangeDenColor.bind(this)
     this.getFromServer = this.getFromServer.bind(this)
     this.getLatLngNextPlace = this.getLatLngNextPlace.bind(this)
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
          denStrokeColor : "rgba(200, 0, 0, 0.9)" 
        }
      }
    }

    showArrowDensity(den,nextDen){
        if(den=='LOW'){
            if(nextDen=='LOW') return require('./pics/arrow/Blank.png')
            else if(nextDen=='MEDIUM')  return require('./pics/arrow/arrow_up_yellow.png')
            else if(nextDen=='HIGH') return require('./pics/arrow/arrow_up_red.png')
            
        }
        else if(den == 'MEDIUM'){
            if(nextDen=='LOW') return require('./pics/arrow/arrow_down_green.png')
            else if(nextDen=='MEDIUM')  return require('./pics/arrow/Blank.png')
            else if(nextDen=='HIGH') return require('./pics/arrow/arrow_up_red.png')
        }
        else if(den == 'HIGH'){
            if(nextDen=='LOW') return require('./pics/arrow/arrow_down_green.png')
            else if(nextDen=='MEDIUM')  return require('./pics/arrow/arrow_down_yellow.png')
            else if(nextDen=='HIGH') return require('./pics/arrow/Blank.png')
        }

    }
    

    //  checkNextPlaceFn(){
    //   for(let i =0;i<12;i++){
    //     if(this.nextPlace[i] == "Not found"){
    //       this.checkNextPlace[i] = false;
    //     }
    //     else this.checkNextPlace[i] = true;
      
    // }
    // }
    getLatLngNextPlace(){
        for(let i =0;i<12;i++){
          if(this.state.nextPlaces[i] != "None")
          return  [{
                    latitude: this.state.nextPlaces[i].lat,
                    longitude: this.state.nextPlaces[i].lng},
                   { 
                     latitude: this.places[i].lat,
                     longitude: this.places[i].lng} ]
        }
    }

    componentWillMount() {

       let url = 'http://203.151.85.73:5050/crowdflow/getAllPlace'
          fetch(url,{method:"GET"})
          .then((response) => response.json())
          .then((responseJson) => {
             if(responseJson){
                 this.setState({test: "cangetPlace"})
              }
              this.places = responseJson.places

              this.getFromServer()
              
              // for(let i =this.places.length-1;i>=0;i--){
              //     this.nextPlace.push(responseJson.places[i]);
              // }     
              
          })
          .catch((error) => {
              console.error(error);
          })
      this.timer = setInterval(()=>this.getFromServer(),60*1000)       
    }

     getFromServer(){


      //FLOW
         //for(let i=0;i<12;i++){
        
          let url = 'http://203.151.85.73:5050/crowdflow/flow?time=5MIN';
          fetch(url,{method:"GET"})
          .then((response) => response.json())
          .then((responseJson) => {
              
              if(responseJson){
                let flowArr = []
                flowArr = responseJson.crowdFlow
                let newNextPlace = []
                for(let i=0;i<12;i++){
                    let p = this.places[i]
                    for(let j=0;j<12;j++){
                        let c = flowArr[j]
                        // this.setState({test: c})
                        
                       if(c && c.place.lat == p.lat && c.place.lng == p.lng){
   
                          // if(!crowdFlow.nextPlace[0]){
                          //   this.setState({test: "no next"})
                            
                          //   crowdFlow.nextPlace[0] = {"name" :"None"}
                          // }
                          // if(c.nextPlace[0]!="None")
                            newNextPlace.push(c.nextPlace[0])
                          // else
                          //   newNextPlace.push({})
                          this.setState({test: "IN loopppp"})

                        }
                    }
                }
                
                this.setState({nextPlaces : newNextPlace})
                 this.setState({test: this.state.nextPlaces[0].date})

                 // this.checkNextPlace[5] = true;
                    // this.checkNextPlaceFn()
                }
              
              
              
            })
          .catch((error) => {
              console.error(error);
          })

      //  }
               
       for(let i=0;i<12;i++){
        
          let url = 'http://203.151.85.73:5050/crowdflow/density?time=NOW&ll='+this.places[i].lat+','+this.places[i].lng;
           fetch(url,{method:"GET"})
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
         for(let i=0;i<12;i++){
        
          let url = 'http://203.151.85.73:5050/crowdflow/density?time=5MIN&ll='+this.places[i].lat+','+this.places[i].lng;
          fetch(url,{method:"GET"})
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

        




        let url1 = 'http://203.151.85.73:5050/crowdflow/random';
          fetch(url1,{method:"GET"})
          .then((response) => response.json())
          .then((responseJson) => {
              let denArr =[]
              denArr = responseJson.density
              this.density[10] = denArr[0].density
              let colorJson = this.onChangeDenColor(this.density[10])          
              this.denColor[10] = colorJson.denColor
              this.denStrokeColor[10] = colorJson.denStrokeColor
            })
          .catch((error) => {
              console.error(error);
          })
        let url2 = 'http://203.151.85.73:5050/crowdflow/random';
          fetch(url2,{method:"GET"})
          .then((response) => response.json())
          .then((responseJson) => {
              let denArr =[]
              denArr = responseJson.density
              this.nextDensity[10] = denArr[0].density
            })
          .catch((error) => {
              console.error(error);
          })
    }
  
render() {
    
    return (
         
      <View style={styles.container}>
        <MapView
          region={this.state.region}
          style={styles.map}
          onRegionChange={this.onRegionChange}
          initialRegion={this.state.region}>
          
            <MapView.Polygon
              coordinates={polygonSiamCenter.coordinates}
              fillColor={this.denColor[0]}
              strokeColor={this.denStrokeColor[0]}
              strokeWidth={2}
              onPress = {() => {
                    this.setState({test: "4321"})
              }} 
            />
            <MapView.Polygon
              coordinates={polygonSiamDis.coordinates}
              fillColor={this.denColor[1]}
              strokeColor={this.denStrokeColor[1]}
              strokeWidth={2} 
            />
            <MapView.Polygon
              coordinates={polygonMBK.coordinates}
              fillColor={this.denColor[2]}
              strokeColor={this.denStrokeColor[2]}
              strokeWidth={2} 
            />          
           
            <MapView.Polygon
              coordinates={polygonCentralWorld.coordinates}
              fillColor={this.denColor[5]}
              strokeColor={this.denStrokeColor[5]}
              strokeWidth={2} 
            />
            <MapView.Polygon
              coordinates={polygonParagon.coordinates}
              fillColor=  {this.denColor[9]}
              strokeColor={this.denStrokeColor[9]}
              strokeWidth={2} 
            />
            <MapView.Polygon
              coordinates={polygonSiamOne.coordinates}
              fillColor={this.denColor[9]}
              strokeColor={this.denStrokeColor[9]}
              strokeWidth={2} 
            />
             <MapView.Polygon
              coordinates={polygonBTSnationalStadium.coordinates}
              fillColor={this.denColor[10]}
              strokeColor={this.denStrokeColor[10]}
              strokeWidth={2} 
            />            
            <MapView.Polygon
              coordinates={polygonBTSsiam.coordinates}
              fillColor={this.denColor[11]}
              strokeColor={this.denStrokeColor[11]}
              strokeWidth={2} //ความหนาของเส้นรอบรูป
            />
             {
                this.places.map((p,idx) =>(
                    (this.state.nextPlaces[idx] == "None") ?(
                        <MapView.Polyline
                          //coordinates={[{latitude:parseFloat(p.lat),longitude: parseFloat(p.lng)},{latitude:this.state.nextPlaces[idx].lat,longitude: this.state.nextPlaces[idx].lng}]}
                          coordinates={[{latitude:13.74497311302548,longitude: 100.53022399050144},{latitude:13.74601377826572,longitude: 100.53440439922444}]}
                          geodesic = {true}
                          strokeWidth = {0}
                          strokeColor = "#e16136"
                        />
                  ):(
                     <MapView.Polyline
                          coordinates={[{latitude:parseFloat(p.lat),longitude: parseFloat(p.lng)},{latitude:this.state.nextPlaces[idx].lat,longitude: this.state.nextPlaces[idx].lng}]}
                          //coordinates={[{latitude:13.745844972517325,longitude: 100.53954639826303},{latitude:13.74601377826572,longitude: 100.53440439922444}]}
                          geodesic = {true}
                          strokeWidth = {3}
                          strokeColor = "#e16136"
                        />
                    )
                ))
            }

          {
            this.places.map((p,idx) =>(
              (this.state.nextPlaces[idx] == "None") ?(
                <MapView.Circle
                  center={{latitude:13.74497311302548,longitude: 100.53022399050144}} 
                  radius={0}
                  fillColor = "#e16136"
                                  
                />
                ):(
                  <MapView.Circle
                  center={{latitude: this.state.nextPlaces[idx].lat, longitude: this.state.nextPlaces[idx].lng}} 
                  radius={10}
                  fillColor = "#e16136"
                                  
                />
                )
               
            ))
          } 
            
                    
              
          {
              this.places.map((p,idx) =>(
                 (this.state.nextPlaces[idx] != "None") ?(
                 <MapView.Marker 
                   coordinate={{latitude: parseFloat(p.lat), longitude: parseFloat(p.lng)}}
                   centerOffset={{ x: 10, y: 60 }}
                   anchor={{ x: 0.69, y: 1 }}
                   //image={require('./pics/arrow/arrow_up_red.png')}>
                   image={this.showArrowDensity(this.density[idx],this.nextDensity[idx])}>
                   <MapView.Callout style={styles.plainView}>
                       <FlowCallout 
                          width={CALLOUT_WIDTH}
                          place = {p.name}
                          currentDensity = {this.density[idx]}
                          nextDensity = {this.nextDensity[idx]}
                          // {(this.state.nextPlace[0].nextPlace.length > 0 )?(
                          nextPlace = {this.state.nextPlaces[idx].name}
                          // }
                          
                       />
                    </MapView.Callout>
                 </MapView.Marker>
                   
                 ):(
                   <MapView.Marker 
                   coordinate={{latitude: parseFloat(p.lat), longitude: parseFloat(p.lng)}}
                   centerOffset={{ x: 10, y: 60 }}
                   anchor={{ x: 0.69, y: 1 }}
                   //image={require('./pics/arrow/arrow_up_red.png')}>
                   image={this.showArrowDensity(this.density[idx],this.nextDensity[idx])}>
                   <MapView.Callout style={styles.plainView}>
                       <FlowCallout 
                          width={CALLOUT_WIDTH}
                          place = {p.name}
                          currentDensity = {this.density[idx]}
                          nextDensity = {this.nextDensity[idx]}
                          nextPlace = {p.lat}
                       />
                    </MapView.Callout>
                 </MapView.Marker>  
                 )    
              ))
              
          }

          
         
         

   

  
       
         
         
        
      

      </MapView>
         
         
          <Text>{this.state.test}</Text>
    </View>
    

    
    );
}
}

FlowMap.propTypes = {
  provider: MapView.ProviderPropType,
};


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
    const  polygonSiamOne = {
     coordinates : [
        {
          latitude: 13.745449, 
          longitude: 100.532977
        },
        {
          latitude: 13.745256, 
          longitude: 100.534266
        },
        {
          latitude: 13.744391, 
          longitude: 100.534164
        },
        {
          latitude: 13.744620, 
          longitude: 100.532807
        },
      ],
   }

   const  polygonBTSsiam = {
     coordinates : [
        {
          latitude: 13.745508,
          longitude: 100.535137 
        },
        {
          latitude: 13.745369, 
          longitude: 100.535106
        },
        {
          latitude: 13.745669, 
          longitude: 100.533258
        },
        {
          latitude: 13.745806,
          longitude:  100.533289 
        },
      ],
   }
    const  polygonBTSnationalStadium = {
     coordinates : [
        {
          latitude: 13.746277, 
          longitude: 100.529724 
        },
        {
          latitude: 13.746489, 
          longitude: 100.529762
        },
        {
          latitude: 13.746726,
          longitude:  100.528395 
        },
        {
          latitude: 13.746533,
          longitude:  100.528349
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



