import React, {useState, useRef} from 'react';
import {
  SafeAreaView,
  Image,
  Text,
  FlatList,
  View,
  ScrollView,
  Animated,
  StyleSheet,
  Dimensions,
  Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import DynamicHeader from '../components/DynamicHeader';
const {width} = Dimensions.get('window');

const addonImg1 = require('../assets/roaming.png');
const addonImg2 = require('../assets/data-minutes.png');
const addonImg3 = require('../assets/gaming.png');

const rewardsImg1 = require('../assets/uncle-osaka.png');
const rewardsImg2 = require('../assets/cinnabon.png');
const rewardsImg3 = require('../assets/jio-chicken.png');
const rewardsImg4 = require('../assets/cinepolis.png');
const rewardsImg5 = require('../assets/three-lines.png');
const rewardsImg6 = require('../assets/funland.png');

const offerImg1 = require('../assets/stc-pay.jpg');
const offerImg2 = require('../assets/premium-number.jpg');
const offerImg3 = require('../assets/roaming-addon.jpg');

const HEADER_MAX_HEIGHT = 320;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 160 : 140;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const Dashboard = () => {
  const data = [
    {
      id: 1,
      title: 'Order a Prepaid SIM',
    },
    {
      id: 2,
      title: 'Order a Postpaid SIM',
    },
    {
      id: 3,
      title: 'Activate Add-ons',
    },
    {
      id: 4,
      title: 'Quick pay',
    },
    {
      id: 5,
      title: 'Buy iPhone devices',
    },
  ];

  const addonsData = [
    {
      id: 1,
      image: addonImg1,
    },
    {
      id: 2,
      image: addonImg2,
    },
    {
      id: 3,
      image: addonImg3,
    },
  ];

  const rewardsData = [
    {
      id: 1,
      image: rewardsImg1,
    },
    {
      id: 2,
      image: rewardsImg2,
    },
    {
      id: 3,
      image: rewardsImg3,
    },
    {
      id: 4,
      image: rewardsImg4,
    },
    {
      id: 5,
      image: rewardsImg5,
    },
    {
      id: 6,
      image: rewardsImg6,
    },
  ];

  const renderItem = ({item}) => {
    return (
      <View style={{marginVertical: 10}}>
        <View style={styles.carouselItem}>
          <View style={styles.carouselIcon}>
            <MaterialIcon name="sim-card" size={24} color="#4f008c" />
          </View>
          <Text style={styles.carouselText}>{item.title}</Text>
        </View>
      </View>
    );
  };

  const renderAddonItem = ({item}) => {
    return (
      <View style={styles.carouselAddonItem}>
        <Image source={item.image} style={styles.addonImage} />
      </View>
    );
  };

  const renderRewardsItem = ({item}) => {
    return (
      <View style={{marginVertical: 10}}>
        <View style={styles.carouselRewardsItem}>
          <Image source={item.image} style={styles.rewardsImage} />
        </View>
      </View>
    );
  };

  const [scrollY] = useState(new Animated.Value(
    // iOS has negative initial scroll value because content inset...
    Platform.OS === "ios" ? -HEADER_MAX_HEIGHT : 0
  ));
  
  const headerTranslate = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -HEADER_SCROLL_DISTANCE],
    extrapolate: 'clamp',
  });

  const titleScale = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 1, 0.8],
    extrapolate: 'clamp',
  });
  const titleTranslate = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 0, -8],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.pageContainer}>
       
      <Animated.ScrollView
        style={styles.fill}
        scrollEventThrottle={1}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY }}}],
          {useNativeDriver: true},
        )}
        // iOS offset for RefreshControl
        contentInset={{
          top: HEADER_MAX_HEIGHT,
        }}
        contentOffset={{
          y: -HEADER_MAX_HEIGHT,
        }}>
        <View style={styles.scrollViewContent}>
          {/* Remaining balance */}
          <View
            style={{
              flex: 1,
              backgroundColor: '#f0f0f0',
              paddingHorizontal: 20,
            }}>
            {/* My plans */}
            <View>
              <Text style={styles.subHeading}>My plans</Text>

              <View
                style={[
                  styles.shadowProp,
                  {
                    flex: 0,
                    backgroundColor: '#fff',
                    borderRadius: 6,
                    padding: 15,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  },
                ]}>
                <View style={{flexDirection: 'row'}}>
                  <View style={styles.iconContainer}>
                    <MaterialIcon name="sim-card" size={20} color="#fff" />
                  </View>
                  <View style={styles.textContainer}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#1d252d',
                        fontWeight: 'bold',
                      }}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      Prepaid Data Local Min Monthly Pack 2
                    </Text>
                    <Text style={{fontSize: 14, color: '#1d252d'}}>
                      38249000
                    </Text>
                  </View>
                </View>
                <View>
                  <Icon name="chevron-forward" size={20} color="#ff375e" />
                </View>
              </View>
            </View>

            {/* My benefits */}
            <View>
              <Text style={styles.subHeading}>My benefits</Text>

              <View
                style={[
                  styles.shadowProp,
                  {
                    flex: 0,
                    backgroundColor: '#fff',
                    borderRadius: 6,
                    padding: 15,
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginBottom: 20,
                  },
                ]}>
                <View style={styles.listContainer}>
                  <View style={styles.listItem}>
                    <View style={styles.listItemContent}>
                      <Icon name="wifi" size={30} color="#4f008c" />
                      <Text
                        style={{
                          fontSize: 14,
                          color: '#1d252d',
                          fontWeight: 'bold',
                          marginLeft: 10,
                        }}>
                        Social Media Data
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#4f008c',
                        fontWeight: 'bold',
                      }}>
                      10 GB left
                    </Text>
                  </View>

                  <View style={styles.listItem}>
                    <View style={styles.listItemContent}>
                      <MaterialIcon
                        name="mobile-screen-share"
                        size={30}
                        color="#4f008c"
                      />
                      <Text
                        style={{
                          fontSize: 14,
                          color: '#1d252d',
                          fontWeight: 'bold',
                          marginLeft: 10,
                        }}>
                        stc to stc Minutes
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#4f008c',
                        fontWeight: 'bold',
                      }}>
                      Unlimited
                    </Text>
                  </View>

                  <View style={styles.listItem}>
                    <View style={styles.listItemContent}>
                      <Icon name="wifi" size={30} color="#4f008c" />
                      <Text
                        style={{
                          fontSize: 14,
                          color: '#1d252d',
                          fontWeight: 'bold',
                          marginLeft: 10,
                        }}>
                        Data Bonus
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#4f008c',
                        fontWeight: 'bold',
                      }}>
                      14 GB left
                    </Text>
                  </View>

                  <View style={styles.listItem}>
                    <View style={styles.listItemContent}>
                      <MaterialIcon
                        name="mobile-friendly"
                        size={30}
                        color="#4f008c"
                      />
                      <Text
                        style={{
                          fontSize: 14,
                          color: '#1d252d',
                          fontWeight: 'bold',
                          marginLeft: 10,
                        }}>
                        Minutes to Other Networks
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#4f008c',
                        fontWeight: 'bold',
                      }}>
                      500
                    </Text>
                  </View>

                  <View style={styles.listItem}>
                    <View style={styles.listItemContent}>
                      <MaterialIcon
                        name="mobile-friendly"
                        size={30}
                        color="#4f008c"
                      />
                      <Text
                        style={{
                          fontSize: 14,
                          color: '#1d252d',
                          fontWeight: 'bold',
                          marginLeft: 10,
                        }}>
                        International Minutes
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#4f008c',
                        fontWeight: 'bold',
                      }}>
                      600 mins left
                    </Text>
                  </View>
                </View>
                <View
                  style={[
                    styles.flexCenter,
                    {
                      flex: 0,
                      borderTopWidth: 1,
                      borderColor: '#ddd',
                      padding: 10,
                      paddingBottom: 0,
                      width: '100%',
                    },
                  ]}>
                  <View style={styles.rowCenter}>
                    <Text style={styles.phoneNumber}>
                      View all active add-ons
                    </Text>
                    <Icon
                      name="chevron-down"
                      size={20}
                      color="#ff375e"
                      style={{marginLeft: 5}}
                    />
                  </View>
                </View>
              </View>
            </View>

            {/* Carousel */}
            <View style={{flex: 1, marginTop: 15}}>
              <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                initialNumToRender={3}
                decelerationRate="normal"
              />
            </View>

            {/* Explore add-ons */}
            <View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={styles.subHeading}>Explore add-ons</Text>
                <Text style={styles.viewAll}>View All</Text>
              </View>

              <View style={{flex: 1, marginBottom: 10}}>
                <FlatList
                  data={addonsData}
                  renderItem={renderAddonItem}
                  keyExtractor={item => item.id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  initialNumToRender={1}
                  decelerationRate="normal"
                />
              </View>
            </View>

            {/* Rewards for you */}
            <View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={[styles.subHeading, {marginVertical: 10}]}>
                  Rewards for you
                </Text>
                <Text style={styles.viewAll}>View All</Text>
              </View>

              <View style={{flex: 1}}>
                <FlatList
                  data={rewardsData}
                  renderItem={renderRewardsItem}
                  keyExtractor={item => item.id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  initialNumToRender={1}
                  decelerationRate="normal"
                />
              </View>
            </View>

            {/* Offers for you */}
            <View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={styles.subHeading}>Offers for you</Text>
                <Text style={styles.viewAll}>View All Offers</Text>
              </View>

              <View style={{flex: 1, marginBottom: 20}}>
                <View style={styles.offersCard}>
                  <View>
                    <Image source={offerImg1} style={styles.offersImage} />
                  </View>
                  <View style={{padding: 10}}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#1d252d',
                        fontWeight: 'bold',
                      }}>
                      Introducing the new Elite Card
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#1d252d',
                        width: '90%',
                        marginVertical: 4,
                      }}
                      ellipsizeMode="tail"
                      numberOfLines={1}>
                      Discover the luxury with earning with stc pay
                    </Text>
                    <View style={styles.offerBtn}>
                      <Text
                        style={{
                          fontSize: 12,
                          color: '#fff',
                          fontWeight: 'bold',
                        }}>
                        STC PAY
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.offersCard}>
                  <View>
                    <Image source={offerImg2} style={styles.offersImage} />
                  </View>
                  <View style={{padding: 10}}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#1d252d',
                        fontWeight: 'bold',
                      }}>
                      Number matters
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#1d252d',
                        width: '85%',
                        marginVertical: 4,
                      }}
                      ellipsizeMode="tail"
                      numberOfLines={1}>
                      Unlock a new experience with a premium number
                    </Text>
                    <View style={styles.offerBtn}>
                      <Text
                        style={{
                          fontSize: 12,
                          color: '#fff',
                          fontWeight: 'bold',
                        }}>
                        PREMIUM NUMBER
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.offersCard}>
                  <View>
                    <Image source={offerImg3} style={styles.offersImage} />
                  </View>
                  <View style={{padding: 10}}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#1d252d',
                        fontWeight: 'bold',
                      }}>
                      Activate your Roaming add-on travel
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#1d252d',
                        width: '95%',
                        marginVertical: 4,
                      }}
                      ellipsizeMode="tail"
                      numberOfLines={1}>
                      Enjoy amazing roaming offers for various
                    </Text>
                    <View style={styles.offerBtn}>
                      <Text
                        style={{
                          fontSize: 12,
                          color: '#fff',
                          fontWeight: 'bold',
                        }}>
                        ROAMING ADD-ON
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Animated.ScrollView>
      <Animated.View
        pointerEvents="none"
        style={[styles.header, {transform: [{translateY: headerTranslate}]}]}>
        {/* <Text>header22</Text> */}
        {/* <DynamicHeader animHeaderValue={scrollY} /> */}
      </Animated.View>
      {/* <Animated.View
        pointerEvents="none"
        style={[styles.header1, {transform: [{translateY: headerTranslate}]}]}>
        <Text>header111</Text>
      </Animated.View> */}
      <Animated.View
        style={[
          styles.bar,
          {
            transform: [{translateY: titleTranslate}],
          },
        ]}>
        <DynamicHeader animHeaderValue={scrollY} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  bar: {
    backgroundColor: 'transparent',
    marginTop: Platform.OS === 'ios' ? 28 : 0,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  scrollViewContent: {
    flex: 1,
    flexDirection: 'column',
    // iOS uses content inset, which acts like padding.
    paddingTop: Platform.OS !== 'ios' ? HEADER_MAX_HEIGHT : 0,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#f0f0f0',
    overflow: 'hidden',
    height: HEADER_MAX_HEIGHT,
  },
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
  flexCenter: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1d252d',
    marginVertical: 20,
  },
  iconContainer: {
    backgroundColor: '#4f008c',
    width: 40,
    height: 40,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  textContainer: {
    flexDirection: 'column',
    width: '75%',
    marginRight: 10,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
  },
  listItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pageContainer: {
    flex: 1,
  },
  shadowProp: {
    elevation: 5,
    shadowColor: '#171717',
  },
  carouselItem: {
    width: width / 4.5, // Adjust the width as needed
    height: 80,
    marginRight: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 6,
    padding: 8,
    flexDirection: 'column',
    elevation: 5,
    shadowColor: '#171717',
  },
  carouselIcon: {
    alignItems: 'flex-end',
    flex: 1,
    width: '100%',
  },
  carouselText: {
    fontSize: 11,
    color: '#1d252d',
    fontWeight: 'bold',
  },
  viewAll: {
    color: '#ff375e',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: 13,
  },
  carouselAddonItem: {
    width: width / 1.5, // Adjust the width as needed
    height: 110,
    marginRight: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 6,
    overflow: 'hidden',
  },
  addonImage: {
    resizeMode: 'cover',
    flex: 1,
    width: '100%',
    borderRadius: 6,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'space-between',
    width: '100%',
    flexDirection: 'column',
    borderRadius: 4,
  },
  imageStyle: {
    borderRadius: 4,
  },
  carouselAddonTitle: {
    color: 'white',
    fontWeight: 'bold',
    paddingTop: 10,
    paddingLeft: 10,
  },
  carouselAddonContent: {
    backgroundColor: '#4f008c',
    height: 28,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomEndRadius: 4,
  },
  carouselAddonText: {
    color: 'white',
    fontSize: 12,
    paddingLeft: 10,
  },
  carouselAddonArrow: {
    backgroundColor: '#ff375e',
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomEndRadius: 4,
  },
  carouselRewardsItem: {
    width: width / 4.5, // Adjust the width as needed
    height: 90,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 6,
    padding: 8,
    elevation: 5,
    shadowColor: '#171717',
  },
  rewardsImage: {
    flex: 1,
    width: '100%', // Make the image width responsive to its parent
    resizeMode: 'contain',
  },
  offersCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 4,
    marginBottom: 15,
    elevation: 5,
    shadowColor: '#171717',
  },
  offersImage: {
    height: 95,
    width: 75,
    resizeMode: 'contain',
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  offerBtn: {
    backgroundColor: '#a94ce4',
    width: 'auto',
    borderRadius: 20,
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginTop: 4,
  },
});

export default Dashboard;
