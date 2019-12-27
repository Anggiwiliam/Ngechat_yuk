import React from 'react'
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import { StyleSheet, View, Text } from 'react-native'

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
   
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

module.exports = class MyApp extends React.Component {
  render() {
    const { region } = this.props;
    console.log(region);

    return (
      <View style={{ backgroundColor: 'EEEBE8'}}>
      <View style ={styles.container}>
        <MapView
         provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude: 	-6.595038,
            longitude: 106.816635,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        >
            <Marker
        coordinate={{latitude: 	-6.595038,longitude: 106.816635}}>
<Callout>
  <Text>haloo</Text>
</Callout>

        </Marker>
        </MapView>
      
        {/* <MapView
         provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude: 	-6.135200,
            longitude: 106.813301,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        >
        </MapView> */}
      </View>
      </View>
    );
  }
}