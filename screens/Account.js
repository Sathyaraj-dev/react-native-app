import React from 'react';
import {Text, View} from 'react-native';

const Account = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
      }}>
      <Text style={{fontSize: 32, textAlign: 'center'}}>Accounts Screen</Text>
    </View>
  );
};

export default Account;
