import React from 'react';
import {Text, View} from 'react-native';
import { ListItem } from '@rneui/themed';

const Shop = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
      }}>
      <Text style={{fontSize: 32, textAlign: 'center'}}>Shop Screen</Text>
    </View>
  );
};

export default Shop;
