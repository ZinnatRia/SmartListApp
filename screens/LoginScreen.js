import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Animated,
  BackHandler,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate fade-in
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    // Handle Android hardware back button
    const backAction = () => {
      navigation.replace('Splash'); // Navigate to Splash on back press
      return true; // Prevent default back behavior
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const handleLogin = () => {
    setSubmitted(true);

    if (username.trim() === '' || password.trim() === '') {
      Alert.alert('Missing Input', 'Please enter both username and password.');
      return;
    }

    navigation.navigate('Dashboard');
  };

  const showUsernameError = submitted && username.trim() === '';
  const showPasswordError = submitted && password.trim() === '';

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Animated.View style={[styles.innerContainer, { opacity: fadeAnim }]}>
          <Text style={styles.title}>🔐 Welcome Back!</Text>

          <View
            style={[
              styles.inputContainer,
              usernameFocused && styles.inputFocused,
              showUsernameError && styles.inputErrorBorder,
            ]}
          >
            <Ionicons
              name="person-outline"
              size={22}
              color={showUsernameError ? 'red' : '#777'}
              style={styles.icon}
            />
            <TextInput
              placeholder="Username"
              placeholderTextColor="#999"
              style={styles.input}
              value={username}
              onChangeText={setUsername}
              onFocus={() => setUsernameFocused(true)}
              onBlur={() => setUsernameFocused(false)}
              autoCapitalize="none"
              returnKeyType="next"
              keyboardType="default"
            />
          </View>
          {showUsernameError && (
            <Text style={styles.errorText}>Please enter your username</Text>
          )}

          <View
            style={[
              styles.inputContainer,
              passwordFocused && styles.inputFocused,
              showPasswordError && styles.inputErrorBorder,
            ]}
          >
            <Ionicons
              name="lock-closed-outline"
              size={22}
              color={showPasswordError ? 'red' : '#777'}
              style={styles.icon}
            />
            <TextInput
              placeholder="Password"
              placeholderTextColor="#999"
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
              autoCapitalize="none"
              returnKeyType="done"
            />
          </View>
          {showPasswordError && (
            <Text style={styles.errorText}>Please enter your password</Text>
          )}

          <TouchableOpacity
            style={styles.button}
            onPress={handleLogin}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </Animated.View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4facfe',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  innerContainer: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    color: '#fff',
    marginBottom: 40,
    fontWeight: '700',
    letterSpacing: 0.6,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 5,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#fff',
  },
  inputFocused: {
    borderColor: '#00c6ff',
    borderWidth: 2,
  },
  inputErrorBorder: {
    borderColor: 'red',
    borderWidth: 2,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#333',
  },
  errorText: {
    width: '90%',
    marginBottom: 10,
    color: 'red',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'left',
  },
  button: {
    width: '90%',
    backgroundColor: '#00c6ff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});
