import * as React from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';

const Menu = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text 
            style={styles.option}
            onPress={() => navigation.navigate('Maps')}
            >
                DESTINACIJE U BLIZINI
            </Text>
            <Text 
            style={styles.option}
            onPress={() => navigation.navigate('History')}
            >
                ISTORIJA LOKACIJA
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    option: {
    alignSelf: "stretch",
    margin: 12,
    borderWidth: 1,
    padding: 10,
    textAlign: "center",
    backgroundColor: "#3246B5",
    color: "#FFEFF0",
    fontWeight: "bold"
    }
  });

export default Menu;