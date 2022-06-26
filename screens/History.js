import * as React from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import AsyncStorage from '@react-native-async-storage/async-storage';

const History = ({ navigation }) => {

    const API_URL = 'http://192.168.1.2:30000';

    const [locationLog, setLocationLog] = React.useState([{
        createdAt: "",
        latitude: 0,
        longitude: 0,
        times: 0
    }]);

    React.useEffect(() => {
        (async () => {
          const token = await AsyncStorage.getItem('@token');

          let response = await fetch(API_URL + '/api/users/locations', {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + token
            }
          });
  
          response = await response.json();
          setLocationLog(response);

        })();
    }, []);

    const renderCellLink = (latidute, longitude) => {
        return (
            <Text
            onPress={() => navigation.navigate('SingleDestination', {
                latitude: latidute,
                longitude: longitude
            })}
            style={{textAlign: "center"}}
            >
                mapa
            </Text>
        );
    }

    const renderCell = (text) => {
      return (
        <Text
        style={styles.text}
        >
          {text}
        </Text>
      );
    }

    const renderCellHead = (text) => {
      return (
        <Text
        style={styles.textHead}
        >
          {text}
        </Text>
      );
    }

    return (
        <View style={styles.container}>
      <Table borderStyle={{ borderWidth: 1 }}>
        <Row
          data={[
            renderCellHead('Vreme'), 
            renderCellHead('Lokacija'), 
            renderCellHead('Broj poseta'), 
            renderCellHead('Prikaži na mapi')
          ]}
          flexArr={[1, 1, 1]}
          style={styles.head}
        />
        
        {locationLog.map((location, index) => {
            return (
    
                <Row
                    data={[
                        renderCell(String(new Date(location.createdAt))), 
                        renderCell(location.latitude + ' ' + location.longitude), 
                        renderCell(location.times),
                        renderCellLink(location.latitude, location.longitude)
                    ]}
                    flexArr={[1, 1, 1, 1]}
                    style={styles.row}
                    key={index}
                />
                
            )
        })}
       
        
      </Table>
    </View>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 100, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: "#3246B5", color: "#FFEFF0", },
    wrapper: { flexDirection: 'row' },
    row: { height: 55, textAlign: 'center' },
    text: { textAlign: 'center' },
    textHead: { textAlign: 'center', color: '#FFEFF0' }
  });

export default History;