import React from 'react';
import {View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Dashboard from './Dashboard';
import Account from './Account';
import Shop from './Shop';
import Offers from './Offers';
import Help from './Help';

const Tab = createBottomTabNavigator();

const Home = () => {
  return (
    <View style={{flex: 1}}>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#4f008c', // Your desired active color
          tabBarStyle: {
            display: 'flex',
            paddingBottom: 4,
            paddingTop: 2,
          },
        }}>
        <Tab.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({color, size}) => (
              <Icon name="home" color={color} size={size} />
            ),
            headerShown: false,
          }}
        />

        <Tab.Screen
          name="Shop"
          component={Shop}
          options={{
            tabBarLabel: 'Shop',
            tabBarIcon: ({color, size}) => (
              <Icon name="bag-handle-outline" color={color} size={size} />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Offers"
          component={Offers}
          options={{
            tabBarLabel: 'Offers',
            tabBarIcon: ({color, size}) => (
              <Icon name="notifications-outline" color={color} size={size} />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Help"
          component={Help}
          options={{
            tabBarLabel: 'Help',
            tabBarIcon: ({color, size}) => (
              <Icon name="help-buoy-outline" color={color} size={size} />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Accounts"
          component={Account}
          options={{
            tabBarLabel: 'Account',
            tabBarIcon: ({color, size}) => (
              <Icon name="person-outline" color={color} size={size} />
            ),
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

export default Home;
