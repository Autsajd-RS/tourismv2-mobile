import * as React from 'react';
import MapView, { Callout, Circle, Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Maps = ({ navigation }) => {
    const [pin, setPin] = React.useState({
        latitude: 0.0,
        longitude: 0.0,
    });

    const API_URL = 'http://192.168.1.2:30000';
  
    const [errorMsg, setErrorMsg] = React.useState('');
  
    const [destinations, setDestinations] = React.useState([{
      id: 0,
      latitude: 0,
      longitude: 0,
      name: ''
    }]);
  
    React.useEffect(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({});
  
        try {
          const token = await AsyncStorage.getItem('@token');

          let response = await fetch(API_URL + '/api/destinations/radius', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + token
            },
            body: JSON.stringify(location.coords),
          });
  
          response = await response.json();
          setDestinations(response);

          let locationLog = {
            latitude: String(location.coords.latitude),
            longitude: String(location.coords.longitude),
          };
          await fetch(API_URL + '/api/users/locations', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify(locationLog)
          });
        } catch (e) {
  
          return;
        }
  
        setPin({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude
        });
  
      })();
    }, []);
  
    return (
      <View style={styles.container}>
        {errorMsg.length > 0 && <Text style="error"></Text>}
        <MapView 
          style={styles.map}
          region={{
            latitude: pin.latitude,
            longitude: pin.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          provider="google"
        >
          <Marker 
            coordinate={pin}
            pinColor='blue'
            draggable={true}
            onDragStart={(e) => {
              console.log("Drag start", e.nativeEvent.coordinates)
            }}
            onDragEnd={async (e) => {
              e.persist();
              try {
                const token = await AsyncStorage.getItem('@token');
                let response = await fetch(API_URL + '/api/destinations/radius', {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token
                  },
                  body: JSON.stringify(e.nativeEvent.coordinate),
                });
        
                response = await response.json();
                setDestinations(response);
              } catch (e) {
        
                return;
              }
              setPin({
                latitude: e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude
              })
            }}
          > 
            <Callout>
              <Text>I'm here</Text>
            </Callout>
          </Marker>
          <Circle 
            center={pin}
            radius={1000}
          />
          {destinations.map((destination, index) => {
            return (
              <Marker
                coordinate={{
                  latitude: Number(destination.latitude),
                  longitude: Number(destination.longitude)
                }}
                key={index}
                pinColor='red'
              >
                <Callout>
                  <Text>{destination.name}</Text>
                </Callout>
              </Marker>
            )
          })}
        </MapView>
      </View>
    );
};

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

export default Maps;