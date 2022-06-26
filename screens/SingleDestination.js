import * as React from 'react';
import MapView, { Callout, Circle, Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

const SingleDestination = ({ route, navigation }) => {
    
    const { latitude, longitude } = route.params;
    return (
        <View style={styles.container}>
            <MapView 
            style={styles.map}
            region={{
                latitude: Number(latitude),
                longitude: Number(longitude),
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
            provider="google"
            >
                <Marker
                coordinate={{
                    latitude: Number(latitude), 
                    longitude: Number(longitude)
                }}
                pinColor='blue'
                draggable={false}
                >
                    <Callout>
                    <Text>I was here</Text>
                    </Callout>
                </Marker>
            </MapView>
        </View>
        
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
    destinationMarker: {
      id: 0,
      latitude: 0,
      longitude: 0,
      name: ''
    },
    error: {
        color: "red"
    }
  });

export default SingleDestination;