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
    Image,
    Picker,
    Item, 
} from 'react-native';
import Main from './Main';
import MapView from 'react-native-maps';
import FlowCallout from './FlowCallout';
import api from './api'
import {SegmentedControls}from 'react-native-radio-buttons'


const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 13.747784;//13.728844053377617;
const LONGITUDE = 100.535947;//100.77809506218118;
const LATITUDE_DELTA = 0.02;
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
    this.den5Color = ["rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)"] ,
    this.den5StrokeColor = ["rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)"] 
    this.den10Color = ["rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)"] ,
    this.den10StrokeColor = ["rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)"] 
    this.den15Color = ["rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)"] ,
    this.den15StrokeColor = ["rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)","rgba(0, 0, 0, 0.5)"] 
    this.next5Density = ["","","","","",""]
    this.next10Density = ["","","","","",""]
    this.next15Density = ["","","","","",""]
    this.places =[]
    this.state = {
      
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      test: "1234",
      flow : ["None","None","None","None","None","None","None"],
      next5MinFlow : ["None","None","None","None","None","None","None"],
      next10MinFlow : ["None","None","None","None","None","None","None"],
      next15MinFlow : ["None","None","None","None","None","None","None"],
      selectedOption: "NOW"
      
    };
     this.onRegionChange = this.onRegionChange.bind(this) //อย่าลืมประกาศทุกฟังก์ชั่นนะ
     this.onChangeDenColor = this.onChangeDenColor.bind(this)
     this.getFromServer = this.getFromServer.bind(this)
     this.showArrowDensity = this.showArrowDensity.bind(this)
    
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

    showArrowDensity(i,select){
      if(select=='NOW'){
        if(this.density[i]=='LOW'){
            if(this.next5Density[i]=='LOW') return require('./pics/arrow/Blank.png')
            else if(this.next5Density[i]=='MEDIUM')  return require('./pics/arrow/arrow_up_yellow.png')
            else if(this.next5Density[i]=='HIGH') return require('./pics/arrow/arrow_up_red.png')
            
        }
        else if(this.density[i] == 'MEDIUM'){
            if(this.next5Density[i]=='LOW') return require('./pics/arrow/arrow_down_green.png')
            else if(this.next5Density[i]=='MEDIUM')  return require('./pics/arrow/Blank.png')
            else if(this.next5Density[i]=='HIGH') return require('./pics/arrow/arrow_up_red.png')
        }
        else if(this.density[i] == 'HIGH'){
            if(this.next5Density[i]=='LOW') return require('./pics/arrow/arrow_down_green.png')
            else if(this.next5Density[i]=='MEDIUM')  return require('./pics/arrow/arrow_down_yellow.png')
            else if(this.next5Density[i]=='HIGH') return require('./pics/arrow/Blank.png')
        }
      }
      if(select=='5MIN'){
        if(this.next5Density[i]=='LOW'){
            if(this.next10Density[i]=='LOW') return require('./pics/arrow/Blank.png')
            else if(this.next10Density[i]=='MEDIUM')  return require('./pics/arrow/arrow_up_yellow.png')
            else if(this.next10Density[i]=='HIGH') return require('./pics/arrow/arrow_up_red.png')
            
        }
        else if(this.next5Density[i] == 'MEDIUM'){
            if(this.next10Density[i]=='LOW') return require('./pics/arrow/arrow_down_green.png')
            else if(this.next10Density[i]=='MEDIUM')  return require('./pics/arrow/Blank.png')
            else if(this.next10Density[i]=='HIGH') return require('./pics/arrow/arrow_up_red.png')
        }
        else if(this.next5Density[i] == 'HIGH'){
            if(this.next10Density[i]=='LOW') return require('./pics/arrow/arrow_down_green.png')
            else if(this.next10Density[i]=='MEDIUM')  return require('./pics/arrow/arrow_down_yellow.png')
            else if(this.next10Density[i]=='HIGH') return require('./pics/arrow/Blank.png')
        }
      }
       if(select=='10MIN'){
        if(this.next10Density[i]=='LOW'){
            if(this.next15Density[i]=='LOW') return require('./pics/arrow/Blank.png')
            else if(this.next15Density[i]=='MEDIUM')  return require('./pics/arrow/arrow_up_yellow.png')
            else if(this.next15Density[i]=='HIGH') return require('./pics/arrow/arrow_up_red.png')
            
        }
        else if(this.next10Density[i] == 'MEDIUM'){
            if(this.next15Density[i]=='LOW') return require('./pics/arrow/arrow_down_green.png')
            else if(this.next15Density[i]=='MEDIUM')  return require('./pics/arrow/Blank.png')
            else if(this.next15Density[i]=='HIGH') return require('./pics/arrow/arrow_up_red.png')
        }
        else if(this.next10Density[i] == 'HIGH'){
            if(this.next15Density[i]=='LOW') return require('./pics/arrow/arrow_down_green.png')
            else if(this.next15Density[i]=='MEDIUM')  return require('./pics/arrow/arrow_down_yellow.png')
            else if(this.next15Density[i]=='HIGH') return require('./pics/arrow/Blank.png')
        }
      }
       if(select=='15MIN'){
       return require('./pics/arrow/Blank.png')
      }
        

    }
    checkCurrentDensity(i,select){
        if(select=="NOW"){
          return this.density[i]
        }
        else if(select=="5MIN"){
          return this.next5Density[i]
        }
        else if(select=="10MIN"){
          return this.next10Density[i]
        }
        else if(select=="15MIN"){
          return this.next15Density[i]
        }
    }
    checkNextDensity(i,select){
        if(select=="NOW"){
          return this.next5Density[i]
        }
        else if(select=="5MIN"){
          return this.next10Density[i]
        }
        else if(select=="10MIN"){
          return this.next15Density[i]
        }
        else if(select=="15MIN"){
          return ""
        }
    }

    checkFlow(i,select){
        if(select=="NOW"){
          return this.state.flow[i]
        }
        else if(select=="5MIN"){
          return this.state.next5MinFlow[i]
        }
        else if(select=="10MIN"){
          return this.state.next10MinFlow[i]
        }
        else if(select=="15MIN"){
          return this.state.next15MinFlow[i]
        }
    }

    checkColor(i,select){
      if(select=="NOW"){
        return this.denColor[i]
      }
      else if(select=="5MIN"){
        return this.den5Color[i]
      }
      else if(select=="10MIN"){
        return this.den10Color[i]
      }
      else if(select=="15MIN"){
        return this.den15Color[i]
      }
    }

    checkStrokeColor(i,select){
      if(select=="NOW"){
        return this.denStrokeColor[i]
      }
      else if(select=="5MIN"){
        return this.den5StrokeColor[i]
      }
      else if(select=="10MIN"){
        return this.den10StrokeColor[i]
      }
      else if(select=="15MIN"){
        return this.den15StrokeColor[i]
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
          })
          .catch((error) => {
              console.error(error);
          })
      this.timer = setInterval(()=>this.getFromServer(),180*1000)       
    }

     getFromServer(){
//Fetch Flow NOW         
          let url = 'http://203.151.85.73:5050/crowdflow/flow?time=NOW';
          fetch(url,{method:"GET"})
          .then((response) => response.json())
          .then((responseJson) => {
              if(responseJson){
                let flowArr = []
                flowArr = responseJson.crowdFlow
                let newNextPlace = []
                for(let i=0;i<7;i++){
                    let p = this.places[i]
                    for(let j=0;j<7;j++){
                        let c = flowArr[j]
                       if(c && c.place.lat == p.lat && c.place.lng == p.lng){
                           newNextPlace.push(c.nextPlace[0])
                       }
                    }
                }
                
                this.setState({flow : newNextPlace})
             }
            })
          .catch((error) => {
              console.error(error);
          })
//Fetch Flow 5MIN         
          let url1 = 'http://203.151.85.73:5050/crowdflow/flow?time=5MIN';
          fetch(url1,{method:"GET"})
          .then((response) => response.json())
          .then((responseJson) => {
              if(responseJson){
                let flowArr = []
                flowArr = responseJson.crowdFlow
                let newNextPlace = []
                for(let i=0;i<7;i++){
                    let p = this.places[i]
                    for(let j=0;j<7;j++){
                        let c = flowArr[j]
                       if(c && c.place.lat == p.lat && c.place.lng == p.lng){
                           newNextPlace.push(c.nextPlace[0])
                       }
                    }
                }
                this.setState({next5MinFlow : newNextPlace})
             }
            })
          .catch((error) => {
              console.error(error);
        })

//Fetch Flow 10MIN         
          let url2 = 'http://203.151.85.73:5050/crowdflow/flow?time=10MIN';
          fetch(url2,{method:"GET"})
          .then((response) => response.json())
          .then((responseJson) => {
              if(responseJson){
                let flowArr = []
                flowArr = responseJson.crowdFlow
                let newNextPlace = []
                for(let i=0;i<7;i++){
                    let p = this.places[i]
                    for(let j=0;j<7;j++){
                        let c = flowArr[j]
                       if(c && c.place.lat == p.lat && c.place.lng == p.lng){
                           newNextPlace.push(c.nextPlace[0])
                       }
                    }
                }
                this.setState({next10MinFlow : newNextPlace})
             }
            })
          .catch((error) => {
              console.error(error);
        })

//Fetch Flow 15MIN         
          let url3 = 'http://203.151.85.73:5050/crowdflow/flow?time=15MIN';
          fetch(url3,{method:"GET"})
          .then((response) => response.json())
          .then((responseJson) => {
              if(responseJson){
                let flowArr = []
                flowArr = responseJson.crowdFlow
                let newNextPlace = []
                for(let i=0;i<7;i++){
                    let p = this.places[i]
                    for(let j=0;j<7;j++){
                        let c = flowArr[j]
                       if(c && c.place.lat == p.lat && c.place.lng == p.lng){
                           newNextPlace.push(c.nextPlace[0])
                       }
                    }
                }
                this.setState({next15MinFlow : newNextPlace})
             }
            })
          .catch((error) => {
              console.error(error);
        })
    
//Fetch Density NOW          
          for(let i=0;i<7;i++){
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
//Fetch Density 5MIN
         for(let i=0;i<7;i++){
        
          let url = 'http://203.151.85.73:5050/crowdflow/density?time=5MIN&ll='+this.places[i].lat+','+this.places[i].lng;
          fetch(url,{method:"GET"})
          .then((response) => response.json())
          .then((responseJson) => {
              let denArr =[]
              denArr = responseJson.density
              this.next5Density[i] = denArr[0].density
              //this.next5Density[i] = "HIGH"
              let colorJson = this.onChangeDenColor(this.next5Density[i])          
              this.den5Color[i] = colorJson.denColor
              this.den5StrokeColor[i] = colorJson.denStrokeColor
              
            })
          .catch((error) => {
              console.error(error);
          })

        }
//Fetch Density 10MIN
         for(let i=0;i<7;i++){
        
          let url = 'http://203.151.85.73:5050/crowdflow/density?time=10MIN&ll='+this.places[i].lat+','+this.places[i].lng;
          fetch(url,{method:"GET"})
          .then((response) => response.json())
          .then((responseJson) => {
              let denArr =[]
              denArr = responseJson.density
              this.next10Density[i] = denArr[0].density
              let colorJson = this.onChangeDenColor(this.next10Density[i])          
              this.den10Color[i] = colorJson.denColor
              this.den10StrokeColor[i] = colorJson.denStrokeColor
             
            })
          .catch((error) => {
              console.error(error);
          })

        }
//Fetch Density 15MIN
         for(let i=0;i<7;i++){
        
          let url = 'http://203.151.85.73:5050/crowdflow/density?time=15MIN&ll='+this.places[i].lat+','+this.places[i].lng;
          fetch(url,{method:"GET"})
          .then((response) => response.json())
          .then((responseJson) => {
              let denArr =[]
              denArr = responseJson.density
              this.next15Density[i] = denArr[0].density
              let colorJson = this.onChangeDenColor(this.next15Density[i])          
              this.den15Color[i] = colorJson.denColor
              this.den15StrokeColor[i] = colorJson.denStrokeColor
              
            })
          .catch((error) => {
              console.error(error);
          })

        }
       
    }
  
render() {
  const options = [
      "NOW",
      "5MIN",
      "10MIN",
      "15MIN"
  ];

  function setSelectedOption(selectedOption){
    this.setState({
      selectedOption  
    });
     
  }
    return (
           <View style={styles.container}>
            <MapView
                region={this.state.region}
                style={styles.map}
                onRegionChange={this.onRegionChange}
                initialRegion={this.state.region}
                loadingEnabled={true}
                showsScale = {true}
                //showsTraffic = {true}
        >

             {
               //Polyline
                this.places.map((p,idx) =>(
                    (this.state.flow[idx] == "None") ?(
                        <MapView.Polyline
                          //coordinates={[{latitude:parseFloat(p.lat),longitude: parseFloat(p.lng)},{latitude:this.state.nextPlaces[idx].lat,longitude: this.state.nextPlaces[idx].lng}]}
                          key = {idx}
                          coordinates={[{latitude:13.74497311302548,longitude: 100.53022399050144},{latitude:13.74601377826572,longitude: 100.53440439922444}]}
                          geodesic = {true}
                          strokeWidth = {0}
                          strokeColor = "#8a2be2"
                        />
                  ):(
                     <MapView.Polyline
                          key = {idx}
                          coordinates={[{latitude:parseFloat(p.lat),longitude: parseFloat(p.lng)},{latitude:this.checkFlow(idx,this.state.selectedOption).lat,longitude: this.checkFlow(idx,this.state.selectedOption).lng}]}
                          //coordinates={[{latitude:parseFloat(p.lat),longitude: parseFloat(p.lng)},{latitude:this.state.flow[idx].lat,longitude: this.state.flow[idx].lng}]}
                          //coordinates={[{latitude:13.745844972517325,longitude: 100.53954639826303},{latitude:13.74601377826572,longitude: 100.53440439922444}]}
                          geodesic = {true}
                          strokeWidth = {3}
                          strokeColor = "#8a2be2"
                          
                        />
                    )
                ))
            }

          {
            this.places.map((p,idx) =>(
              (this.state.flow[idx] == "None") ?(
                <MapView.Circle
                  key = {idx}
                  center={{latitude:13.74497311302548,longitude: 100.53022399050144}} 
                  radius={0}
                  fillColor = "#8a2be2"
                                  
                />
                ):(
                  <MapView.Circle
                  key = {idx}
                  center={{latitude: this.state.flow[idx].lat, longitude: this.state.flow[idx].lng}} 
                  radius={15}
                  fillColor = "#8a2be2"
                  strokeColor = "#8a2be2"
                  zIndex = {10}
                                  
                />
                )
               
            ))
          } 
          <MapView.Polygon
              coordinates={polygonSiamCenter.coordinates}
              fillColor={this.checkColor(0,this.state.selectedOption)}
              strokeColor={this.checkStrokeColor(0,this.state.selectedOption)}
              strokeWidth={2}
              onPress = {() => {
                    this.setState({test: "4321"})
              }} 
            />
            <MapView.Polygon
              coordinates={polygonSiamDis.coordinates}
              fillColor={this.checkColor(1,this.state.selectedOption)}
              strokeColor={this.checkStrokeColor(1,this.state.selectedOption)}
              strokeWidth={2} 
            />
            <MapView.Polygon
              coordinates={polygonMBK.coordinates}
              fillColor={this.checkColor(2,this.state.selectedOption)}
              strokeColor={this.checkStrokeColor(2,this.state.selectedOption)}
              strokeWidth={2} 
            />          
           
            <MapView.Polygon
              coordinates={polygonCentralWorld.coordinates}
              fillColor={this.checkColor(3,this.state.selectedOption)}
              strokeColor={this.checkStrokeColor(3,this.state.selectedOption)}
              strokeWidth={2} 
            />
            <MapView.Polygon
              coordinates={polygonParagon.coordinates}
              fillColor={this.checkColor(4,this.state.selectedOption)}
              strokeColor={this.checkStrokeColor(4,this.state.selectedOption)}
              strokeWidth={2} 
            />
           
             <MapView.Polygon
              coordinates={polygonBTSnationalStadium.coordinates}
              fillColor={this.checkColor(5,this.state.selectedOption)}
              strokeColor={this.checkStrokeColor(5,this.state.selectedOption)}
              strokeWidth={2} 
            />            
            <MapView.Polygon
              coordinates={polygonBTSsiam.coordinates}
              fillColor={this.checkColor(6,this.state.selectedOption)}
              strokeColor={this.checkStrokeColor(6,this.state.selectedOption)}
              strokeWidth={2} //ความหนาของเส้นรอบรูป
            />
            
                    
   
          {
              this.places.map((p,idx) =>(
                 (this.state.flow[idx] != "None") ?(
                 <MapView.Marker 
                   key = {idx}
                   coordinate={{latitude: parseFloat(p.lat), longitude: parseFloat(p.lng)}}
                   centerOffset={{ x: 10, y: 60 }}
                   anchor={{ x: 0.69, y: 1 }}
                   //image={require('./pics/arrow/arrow_up_red.png')}>
                   image={this.showArrowDensity(idx,this.state.selectedOption)}>
                   <MapView.Callout style={styles.plainView}>
                       <FlowCallout 
                          width={CALLOUT_WIDTH}
                          place = {p.name}
                          currentDensity = {this.checkCurrentDensity(idx,this.state.selectedOption)}
                          nextDensity = {this.checkNextDensity(idx,this.state.selectedOption)}
                          // {(this.state.nextPlace[0].nextPlace.length > 0 )?(
                          nextPlace = {this.checkFlow(idx,this.state.selectedOption).name}
                          // }
                          
                       />
                    </MapView.Callout>
                 </MapView.Marker>
                   
                 ):(
                   <MapView.Marker 
                   key = {idx}
                   coordinate={{latitude: parseFloat(p.lat), longitude: parseFloat(p.lng)}}
                   centerOffset={{ x: 10, y: 60 }}
                   anchor={{ x: 0.69, y: 1 }}
                   //image={require('./pics/arrow/arrow_up_red.png')}>
                   image={this.showArrowDensity(idx,this.state.selectedOption)}>
                   <MapView.Callout style={styles.plainView}>
                       <FlowCallout 
                          width={CALLOUT_WIDTH}
                          place = {p.name}
                          currentDensity = {this.checkCurrentDensity(idx,this.state.selectedOption)}
                          nextDensity = {this.checkNextDensity(idx,this.state.selectedOption)}
                          //nextPlace = {p.lat}
                       />
                    </MapView.Callout>
                 </MapView.Marker>  
                 )    
              ))
              
          }
         
         </MapView> 
         <View style={styles.segmentContainer}>
          <SegmentedControls
            options={ options }
            onSelection={ setSelectedOption.bind(this) }
            selectedOption={ this.state.selectedOption }
            direction = {"column"}
            
         />
        </View>
         <View style={styles.legendContainer}>
            <Image
               source={require('./pics/arrow/symbol.png') } 
               style={styles.legend}
               resizeMode='contain' />
              
         </View>
        </View>
  
    );
}
}

FlowMap.propTypes = {
  provider: MapView.ProviderPropType,
};

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
          longitude: 100.528349
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
    legendContainer: {
    position: 'absolute',
    left: 220,
    right: 0,
    bottom: 0,
    height: 100,//80
    width: 220,
    //flex: 1,
    alignItems: 'center',
    //flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'transparent'
},
  legend: {
    top: 0,
    right: 0,
    height: 100,//60
    width: 220,//180
    flexDirection: 'row',
    resizeMode: 'cover'
},
  segmentContainer: {
    position: 'absolute',
    left: 300,
    right: 0,
    bottom: 480,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'transparent'
},
 
 

});



