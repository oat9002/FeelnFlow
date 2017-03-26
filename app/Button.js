import React, { PropTypes } from 'react';
import { Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

export default function Button({ title, onPress }) {
  return (
    <TouchableOpacity activeOpacity={0.9} style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

Button.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func,
};

const styles = StyleSheet.create({
  button: {
    width: WIDTH * 0.5,
    height: HEIGHT * 0.08,
    borderRadius: 50,
    borderWidth: 0,
    backgroundColor: '#009688',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  buttonText: {
    alignSelf: 'center',
    fontSize: 15,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '100',
  },
});