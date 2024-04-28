import React, {useState, useEffect, useRef} from 'react';
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './screens/Home';

const Stack = createNativeStackNavigator();

const HomeScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    validateForm();
  }, [name, password]);

  const validateForm = () => {
    let errors = {};

    if (!name) {
      errors.name = 'Name is required.';
    }

    if (!password) {
      errors.password = 'Password is required.';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters.';
    }

    setNameError(errors.name || '');
    setPasswordError(errors.password || '');
    setIsFormValid(Object.keys(errors).length === 0);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    if (isFormValid) {
      navigation.navigate('Welcome');
      console.log('Form submitted successfully!');
    } else {
      console.log('Form has errors. Please correct them.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={styles.logo}>
          <Image
            source={require('./assets/stc_logo.png')}
            style={{width: 84, height: 42}}
          />
        </View>
        <View style={styles.content}>
          <TextInput
            style={styles.input}
            placeholder="Enter a name"
            value={name}
            onChangeText={setName}
          />
          {isSubmitted && nameError ? (
            <Text style={styles.error}>{nameError}</Text>
          ) : null}
          <TextInput
            style={styles.input}
            placeholder="Enter a password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          {isSubmitted && passwordError ? (
            <Text style={styles.error}>{passwordError}</Text>
          ) : null}
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HomePage"
          component={HomeScreen}
          options={{
            title: 'My stc App',
            headerStyle: {backgroundColor: '#4f008c'},
            contentStyle: {backgroundColor: 'white'},
            headerTintColor: 'white',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="Welcome"
          component={Home}
          options={{
            title: 'Welcome',
            headerStyle: {backgroundColor: '#4f008c'},
            contentStyle: {backgroundColor: 'white'},
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

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
  input: {
    width: '100%',
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: '#ff375e',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 12,
    height: 50,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  error: {
    color: 'red',
    fontSize: 14,
    marginBottom: 12,
  },
  phoneNumber: {
    color: '#ff375e',
    fontWeight: 'bold',
  },
});

export default App;
