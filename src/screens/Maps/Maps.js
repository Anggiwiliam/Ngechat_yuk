import React from 'react'
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import { StyleSheet, View, Text , ToastAndroid, TouchableOpacity, Image, SafeAreaView,Dimensions,Platform} from 'react-native'
import Geolocation from 'react-native-geolocation-service';
import {Database} from '../../Config/Firebase';
import AsyncStorage from '@react-native-community/async-storage';

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 600,
    width: 600,
    justifyContent: 'flex-end',
    alignItems: 'center',
   
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

module.exports = class MyApp extends React.Component {
  state = {
    initial: 'state',
    mapRegion: null,
    latitude: 0,
    longitude: 0,
    userList: [],
    uid: null,
  };

  componentDidMount = async () => {
    await this.getUser();
    await this.getLocation();
    // const uid = await AsyncStorage.getItem('userid');
  };

  getUser = async () => {
    const uid = await AsyncStorage.getItem('userid');
    this.setState({uid: uid});
    Database.ref('/user').on('child_added', result => {
      let data = result.val();
      if (data !== null && data.id != uid) {
        // console.log(data);
        // let users = Object.values(data);
        // console.log(users);
        this.setState(prevData => {
          return {userList: [...prevData.userList, data]};
        });
      }
    });
  };

  hasLocationPermission = async () => {
    if (
      Platform.OS === 'ios' ||
      (Platform.OS === 'android' && Platform.Version < 23)
    ) {
      return true;
    }
    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (hasPermission) {
      return true;
    }
    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }
    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location Permission Denied By User.',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location Permission Revoked By User.',
        ToastAndroid.LONG,
      );
    }
    return false;
  };

  getLocation = async () => {
    const hasLocationPermission = await this.hasLocationPermission();

    if (!hasLocationPermission) {
      return;
    }

    this.setState({loading: true}, () => {
      Geolocation.getCurrentPosition(
        position => {
          let region = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.00922,
            longitudeDelta: 0.00421 * 1.5,
          };
          this.setState({
            mapRegion: region,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            loading: false,
          });
          // console.warn(position);
        },
        error => {
          this.setState({errorMessage: error});
          // console.warn(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
          distanceFilter: 50,
          forceRequestLocation: true,
        },
      );
    });
  };
  render() {
    // const { region } = this.props;
    // console.log(region);

    return (
      <SafeAreaView style={{flex: 1}}>
        <View
          style={[
            styles.container,
            {
              justifyContent: 'center',
              paddingHorizontal: 20,
              paddingTop: 10,
            },
          ]}>
          <MapView
            style={{width: '100%', height: '100%'}}
            showsMyLocationButton={true}
            showsIndoorLevelPicker={true}
            showsUserLocation={true}
            zoomControlEnabled={true}
            showsCompass={true}
            showsTraffic={true}
            region={this.state.mapRegion}
            initialRegion={{
              latitude: -6.595038,
              longitude: 	106.816635,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}>
            {this.state.userList.map(item => {
              // console.warn(item);
              return (
                <Marker
                  key={item.id}
                  title={item.name}
                  description={item.status}
                  draggable
                  coordinate={{
                    latitude: item.latitude || 0,
                    longitude: item.longitude || 0,
                  }}
                  onCalloutPress={() => {
                    this.props.navigation.navigate('Profila', {
                      item,
                    });
                  }}>
                  <View>
                    <Image
                      source={{uri: item.photo}}
                      style={{width: 40, height: 40, borderRadius: 50}}
                    />
                    <Text>{item.name}</Text>
                  </View>
                </Marker>
              );
            })}
          </MapView>
          <View style={styles.menuBottom}>
            <TouchableOpacity>
              <Text
                style={styles.buttonText}
                onPress={() => this.getLocation()}>
                Get Current Location
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}