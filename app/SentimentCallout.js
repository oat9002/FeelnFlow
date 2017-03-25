import React, { Component } from 'react';
import { View, Text, StyleSheet} from 'react-native';

export default class SentimentCallout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggle: false
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            toggle: !this.state.toggle
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text style={{fontWeight: 'bold'}}>What they type!</Text>
                </View>
                <View style={styles.emotion_container}>
                    { 
                        this.props.texts != null ? (
                            this.props.texts.map((t, idx) => (
                                <Text key={idx}>{t}</Text>
                            ))
                            
                        ) : (
                            <Text>test</Text>
                        )  
                    }
                </View>  
            </View>    
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between'
    },
    line: {
        height: 0.3,
        backgroundColor: 'black'
    },
    emotion_container: {
        flexDirection: 'row',
    }
})
