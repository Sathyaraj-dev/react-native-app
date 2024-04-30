import React, {useState, useRef, useMemo} from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  Alert,
  Animated,
  StyleSheet,
  LayoutAnimation,
  UIManager,
  Pressable,
  Modal,
  Button,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import RadioGroup from 'react-native-radio-buttons-group';

const HEADER_MAX_HEIGHT = 320;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 160 : 140;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const DynamicHeader = ({animHeaderValue}) => {
  const [showBalance, setShowBalance] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const contentAccordionHeight = useRef(new Animated.Value(0)).current;
  const [modalVisible, setModalVisible] = useState(false);
  // const [selectedValue, setSelectedValue] = useState(radioButtons[0].value);
  //const [selectedId, setSelectedId] = useState();

  const radioButtons = useMemo(
    () => [
      {
        id: '1', // acts as primary key, should be unique and non-empty string
        label: (
          <View style={styles.modalList}>
            <Text style={styles.modalText}>38249000</Text>
            <Text style={styles.modalSubText}>PREPAID DATA</Text>
          </View>
        ),
        value: '38249000',
        borderColor: '#4f008c',
        color: '#4f008c',
        size: 20,
        selected: true,
      },
      {
        id: '2',
        label: (
          <View style={styles.modalList}>
            <Text style={styles.modalText}>33000880</Text>
            <Text style={styles.modalSubText}>
              TEMPORARY TERMINATION BB PLAN
            </Text>
          </View>
        ),
        value: '33000880',
        borderColor: '#4f008c',
        color: '#4f008c',
        size: 20,
      },
    ],
    [],
  );

  const [selectedId, setSelectedId] = useState(radioButtons[0].id); // Select first option by default

  const toggleAccordion = () => {
    //Header_Max_Height = isExpanded ? 320 : 490;
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded(!isExpanded);
  };

  const balanceOpacity = animHeaderValue.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 1, 0],
    extrapolate: 'clamp',
  });

  animHeaderValue.addListener(({value}) => {
    if (value > 50 && showBalance) {
      setShowBalance(false);
    } else if (value <= 50 && !showBalance) {
      setShowBalance(true);
    }
  });

  const getSelectedRadioValue = () => {
    const selectedRadio = radioButtons.find(
      radioButton => radioButton.id === selectedId,
    );
    console.log(selectedRadio);
    return selectedRadio ? selectedRadio.value : null;
  };

  return (
    <Animated.View
      style={{
        flex: 1,
        flexDirection: 'column',
        width: '100%',
      }}>
      <View style={{flex: 0, backgroundColor: '#4f008d', padding: 20}}>
        {showBalance && (
          <Animated.Text style={{color: '#fff', opacity: balanceOpacity}}>
            Hello
          </Animated.Text>
        )}
        {/* <Text style={[styles.phoneNumber, {marginBottom: 10}]}>38249000</Text> */}
        <Pressable onPress={() => setModalVisible(true)}>
          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.phoneNumber, {marginBottom: 10}]}>
              {getSelectedRadioValue()}
            </Text>
            <Icon
              name={'chevron-down'}
              size={20}
              color="#ff375e"
              style={{marginLeft: 5}}
            />
          </View>
        </Pressable>

        {showBalance && (
          <Animated.Text style={[styles.myBalance, {opacity: balanceOpacity}]}>
            My balance
          </Animated.Text>
        )}
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <Pressable
          style={styles.modalBackground}
          onPress={() => setModalVisible(!modalVisible)}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.selectNumber}>
                <MaterialIcon name="mobile-friendly" size={24} color="#000" />
                <Text
                  style={{
                    marginLeft: 10,
                    fontWeight: 'bold',
                    color: '#1d252d',
                  }}>
                  Select number
                </Text>
              </View>

              <RadioGroup
                radioButtons={radioButtons}
                onPress={setSelectedId}
                selectedId={selectedId}
              />
              <Button
                onPress={() => setModalVisible(!modalVisible)}
                title="Confirm"
                color="#ff375e"
                accessibilityLabel="Confirm"
              />
            </View>
          </View>
        </Pressable>
      </Modal>
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
          style={[styles.flexCenter, {paddingHorizontal: 20, paddingTop: 10}]}>
          <Text style={{color: '#1d252d', fontSize: 12}}>
            Remaining balance
          </Text>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: '#1d252d'}}>
            10.500 BHD
          </Text>
          <Text style={{fontSize: 12, marginBottom: 8}}>
            Valid until: 01/12/2024
          </Text>

          {showBalance && (
            <Animated.Text
              style={{
                //opacity: headerOpacity,
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
                <View>
                  <Text style={{fontSize: 12, color: '#1d252d'}}>
                    Roaming Data
                  </Text>
                  <Text style={{fontSize: 12, color: '#1d252d'}}>
                    Pay as you Go status
                  </Text>
                </View>
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
    borderColor: '#ddd',
    paddingVertical: 11,
    color: '#1d252d',
    alignItems: 'center',
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
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 30,
    paddingHorizontal: 20,
    paddingBottom: 20,
    justifyContent: 'flex-end',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalList: {
    borderTopWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 10,
    flexDirection: 'column',
    width: '100%',
    paddingLeft: 12,
  },
  selectNumber: {
    flexDirection: 'row',
    paddingBottom: 10,
  },
  modalText: {
    color: '#1d252d',
  },
});

export default DynamicHeader;
