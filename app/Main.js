import React, { Component } from 'react';
import { StyleSheet, Text, View , Button} from 'react-native';
import emo from './pics/emo_white.png';
import people from './pics/people_white.png';

class Main extends React.Component {
  render() {
    return(
        <View style={styles.container}>
          <View style={styles.view_title}>
            <Text style={[styles.title, styles.basefont]}>feeln4</Text>
          </View>
          <View style={styles.button}>
            <View>
              <Button title="Sentiment"></Button>
            </View>
            <View style={{marginTop: 10}}>
              <Button title="Crowd Flow"></Button>
            </View>
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#003748'
  },
  basefont: {
    fontFamily: 'Open Sans'
  },
  title: {
    fontSize: 48,
    textAlign: 'center'
  },
  view_title: {
    justifyContent: 'center'
  },
  button: {
    marginBottom: 60,
    marginHorizontal: 100
  }
});

export default Main;
