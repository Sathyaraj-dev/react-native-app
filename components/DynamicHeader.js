import React, {useState, useRef} from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  Alert,
  Animated,
  StyleSheet,
  LayoutAnimation,
  UIManager,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

let Header_Max_Height = 320;
const Header_Min_Height = 140;
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const DynamicHeader = ({animHeaderValue}) => {
  const [showBalance, setShowBalance] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const contentAccordionHeight = useRef(new Animated.Value(0)).current;

  const toggleAccordion = () => {
    Header_Max_Height = isExpanded ? 320 : 490;

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded(!isExpanded);
  };

  const headerOpacity = animHeaderValue.interpolate({
    inputRange: [0, 50], // Change 50 to the scroll distance you want before hiding "My balance"
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const animateHeaderHeight = animHeaderValue.interpolate({
    inputRange: [0, Header_Max_Height - Header_Min_Height],
    outputRange: [Header_Max_Height, Header_Min_Height],
    extrapolate: 'clamp',
  });

  animHeaderValue.addListener(({value}) => {
    if (value > 50 && showBalance) {
      setShowBalance(false);
    } else if (value <= 50 && !showBalance) {
      setShowBalance(true);
    }
  });

  return (
    <Animated.View
      style={[
        styles.header,
        {
          height: animateHeaderHeight,
        },
      ]}>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
        }}>
        <View style={{flex: 0, backgroundColor: '#4f008d', padding: 20}}>
          {/* <Text style={{color: '#fff'}}>Hello</Text> */}
          {showBalance && (
            <Animated.Text style={{color: '#fff', opacity: headerOpacity}}>
              Hello
            </Animated.Text>
          )}
          <Text style={[styles.phoneNumber, {marginBottom: 10}]}>38249000</Text>
          {showBalance && (
            <Animated.Text style={[styles.myBalance, {opacity: headerOpacity}]}>
              My balance
            </Animated.Text>
          )}
        </View>
        <View
          style={[
            styles.shadowProp,
            {
              flex: 0,
              backgroundColor: '#fff',
              borderRadius: 6,
              marginHorizontal: 20,
              marginTop: -20,
            },
          ]}>
          <View
            style={[
              styles.flexCenter,
              {paddingHorizontal: 20, paddingTop: 10},
            ]}>
            <Text style={{color: '#1d252d', fontSize: 12}}>
              Remaining balance
            </Text>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: '#1d252d'}}>
              10.500 BHD
            </Text>
            <Text style={{fontSize: 13, marginBottom: 8}}>
              Valid until: 01/12/2024
            </Text>

            {showBalance && (
              <Animated.Text
                style={{
                  opacity: headerOpacity,
                  fontSize: 12,
                  color: '#1d252d',
                }}>
                Line status: <Text style={{color: '#25c9cd'}}>Active</Text>
              </Animated.Text>
            )}
            {showBalance && (
              <TouchableOpacity
                style={styles.btnRecharge}
                onPress={() => Alert.alert('Recharge')}>
                <Text style={styles.btnText}>Recharge</Text>
              </TouchableOpacity>
            )}
          </View>
          {isExpanded && showBalance && (
            <View style={[styles.content, {height: contentAccordionHeight}]}>
              <View
                style={{
                  paddingHorizontal: 20,
                  borderTopWidth: 1,
                  borderColor: '#ddd',
                }}>
                <View style={styles.lineList}>
                  <Text style={{fontSize: 12, color: '#1d252d'}}>
                    Line status
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: 'bold',
                      color: '#1d252d',
                    }}>
                    Active
                  </Text>
                </View>
                <View style={styles.lineList}>
                  <Text style={{fontSize: 12, color: '#1d252d'}}>
                    Valid until
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: 'bold',
                      color: '#1d252d',
                    }}>
                    01/12/2025
                  </Text>
                </View>
                <View style={styles.lineList}>
                  <Text style={{fontSize: 12, color: '#1d252d'}}>
                    Roaming Data
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: 'bold',
                      color: '#ff375e',
                    }}>
                    VIEW / EDIT
                  </Text>
                </View>
                <View style={styles.lineList}>
                  <Text style={{fontSize: 12, color: '#1d252d'}}>
                    AutoRecharge
                  </Text>
                  <Text style={{fontSize: 12, fontWeight: 'bold'}}>OFF</Text>
                </View>
              </View>
            </View>
          )}

          {showBalance && (
            <View
              style={[
                styles.flexCenter,
                {
                  flex: 0,
                  borderTopWidth: 1,
                  borderColor: '#ddd',
                  padding: 10,
                  backgroundColor: '#fff',
                  borderBottomLeftRadius: 6,
                  borderBottomRightRadius: 6,
                  marginTop: 8,
                },
              ]}>
              <TouchableOpacity
                onPress={toggleAccordion}
                style={styles.viewLine}
                activeOpacity={1}>
                <View style={styles.rowCenter}>
                  <Text style={styles.phoneNumber}>View line details</Text>
                  <Icon
                    name={isExpanded ? 'chevron-up' : 'chevron-down'}
                    size={20}
                    color="#ff375e"
                    style={{marginLeft: 5}}
                  />
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: '#fff',
  },
  logoContainer: {
    alignItems: 'center',
  },
  appbar: {
    backgroundColor: '#4f008c',
    width: '100%',
    height: 40,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  },
  logo: {
    marginTop: 20,
    marginBottom: 20,
  },
  content: {
    marginTop: 20,
    width: '100%',
  },
  phoneNumber: {
    color: '#ff375e',
    fontWeight: 'bold',
  },
  myBalance: {
    color: '#fff',
    marginTop: 15,
    marginBottom: 12,
  },
  flexCenter: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lineList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
    color: '#1d252d',
  },
  btnRecharge: {
    backgroundColor: '#ff375e',
    padding: 5,
    height: 30,
    width: '100%', // Make the button full width
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    marginTop: 5,
    marginBottom: 10,
  },
  btnText: {
    color: '#fff',
    fontSize: 13,
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shadowProp: {
    elevation: 5,
    shadowColor: '#171717',
  },
  viewLine: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default DynamicHeader;
