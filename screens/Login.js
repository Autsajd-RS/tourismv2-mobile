import * as React from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {

  const API_URL = 'http://192.168.1.2:30000';

  const [credentials, setCredentials] = React.useState({
    email: '',
    password: ''
  });
  const [emailError, setEmailError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [loginError, setLoginError] = React.useState("");
  const [emailValid, setEmailValid] = React.useState(false);
  const [passwordValid, setPasswordValid] = React.useState(false);

  const validateEmail = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  
    if(text.length == 0){
      setEmailError("Obavezno polje");
    }        
    else if(text.indexOf(' ') >= 0){        
      setEmailError('Nepravilan email');                          
    }
    else if(reg.test(credentials.email) === false) {
      setEmailError('Nepravilan email');   
    } else{
      setEmailError("");
      setEmailValid(true);
    }
  }

  const validatePassword = (text) => {
    if(text.length == 0){
      setPasswordError("Obavezno polje");
    }        
    else if(text.length < 8){
      setPasswordError("Lozinka mora da sadrži bar 8 karaktera");
    }      
    else if(text.indexOf(' ') >= 0){        
      setPasswordError('Lozinka ne sme da sadrži razmak');                          
    }    
    else{
      setPasswordError("");
      setPasswordValid(true);
    }
  }

  return (
      <View style={styles.container}>
        <Text>Email</Text>
        {emailError.length > 0 && <Text style={styles.error}>{emailError}</Text>}
        <TextInput
        style={styles.input}
        placeholder="email"
        onChangeText={(newText) => {
          validateEmail(newText);
          setCredentials({email: newText, password: credentials.password});
        }}
        />
        <Text>Lozinka</Text>
        {passwordError.length > 0 && <Text style={styles.error}>{passwordError}</Text>}
        <TextInput
        style={styles.input}
        secureTextEntry={true}
        placeholder="lozinka"
        onChangeText={(newText) => {
          validatePassword(newText);
          setCredentials({email: credentials.email, password: newText})
        }}
        />
        {loginError.length > 0 && <Text style={styles.error}>{loginError}</Text>}
        <Button 
        title='Uloguj se'
        onPress={async () => {
          try {
            if (emailValid && passwordValid) {
              let response = await fetch(API_URL + '/api/login', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
              });
    
              response = await response.json();
              
              if (response.hasOwnProperty('message')) {
                setLoginError(response.message);
              }
  
              if (response.hasOwnProperty('token') && response.hasOwnProperty('refresh_token')) {
                try {
                  await AsyncStorage.setItem('@token', response.token);
                  await AsyncStorage.setItem('@refresh_token', response.refresh_token);
  
                  navigation.navigate('Menu');
                } catch (error) {
  
                  console.log(error);
                }
              }
            }
          } catch (e) {
            
          }
          
        }}
        />
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    alignSelf: "stretch",
    textAlign: "center"
  },
  error: {
    color: "red"
  }
});

export default Login;