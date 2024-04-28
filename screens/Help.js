import React from 'react';
import {Text, View} from 'react-native';

const Help = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
      }}>
      <Text style={{fontSize: 32, textAlign: 'center'}}>Help Screen</Text>
    </View>
  );
};

export default Help;
