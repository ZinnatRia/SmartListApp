import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function SplashScreen({ navigation }) {
  const [showSecondText, setShowSecondText] = useState(false);

  const fadeAnim1 = useRef(new Animated.Value(0)).current;
  const scaleAnim1 = useRef(new Animated.Value(0.6)).current;
  const emojiFade = useRef(new Animated.Value(0)).current;

  const fadeAnim2 = useRef(new Animated.Value(0)).current;
  const scaleAnim2 = useRef(new Animated.Value(0.6)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim1, {
          toValue: 1,
          duration: 1600,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim1, {
          toValue: 1,
          friction: 4,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(emojiFade, {
        toValue: 1,
        duration: 800,
        delay: 400,
        useNativeDriver: true,
      }),
    ]).start();

    const switchTimer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(fadeAnim1, {
          toValue: 0,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim1, {
          toValue: 0.6,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(emojiFade, {
          toValue: 0,
          duration: 700,
          useNativeDriver: true,
        }),
      ]).start();

      setShowSecondText(true);

      Animated.parallel([
        Animated.timing(fadeAnim2, {
          toValue: 1,
          duration: 1600,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim2, {
          toValue: 1,
          friction: 4,
          useNativeDriver: true,
        }),
      ]).start();
    }, 3000);

    const navTimer = setTimeout(() => {
      navigation.replace('Login');
    }, 6500);

    return () => {
      clearTimeout(switchTimer);
      clearTimeout(navTimer);
    };
  }, []);

  return (
    <LinearGradient colors={['#4facfe', '#00f2fe']} style={styles.gradient}>
      <View style={styles.centeredContainer}>
        {!showSecondText && (
          <Animated.View
            style={[
              styles.logoContainer,
              { opacity: fadeAnim1, transform: [{ scale: scaleAnim1 }] },
            ]}
          >
            <Text style={styles.welcomeLine1}>Welcome to My</Text>
            <Text style={styles.welcomeLine2}>SmartList App!</Text>
            <Animated.Text style={[styles.emoji, { opacity: emojiFade }]}>🚀✨</Animated.Text>
          </Animated.View>
        )}

        {showSecondText && (
          <Animated.View
            style={[
              styles.logoContainer,
              { opacity: fadeAnim2, transform: [{ scale: scaleAnim2 }] },
            ]}
          >
            <Text style={styles.devLine1}>Developed</Text>
            <Text style={styles.devLine2}>by</Text>
            <Text style={styles.devLine3}>Zinnat Fowzia Ria</Text>
          </Animated.View>
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',  // vertical center
    alignItems: 'center',      // horizontal center
  },
  logoContainer: {
    marginHorizontal: 30,
    paddingVertical: 40,
    paddingHorizontal: 35,
    backgroundColor: '#ffffffcc',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
    alignItems: 'center',
    width: '85%',
  },
  welcomeLine1: {
    fontSize: 30,
    fontWeight: '600',
    color: '#0d47a1',
    marginBottom: 6,
    textAlign: 'center',
  },
  welcomeLine2: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#1565c0',
    marginBottom: 12,
    textAlign: 'center',
  },
  emoji: {
    fontSize: 40,
    textAlign: 'center',
  },
  devLine1: {
    fontSize: 28,
    fontWeight: '600',
    color: '#222',
    textAlign: 'center',
  },
  devLine2: {
    fontSize: 20,
    fontStyle: 'italic',
    marginVertical: 8,
    color: '#666',
    textAlign: 'center',
  },
  devLine3: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0d47a1',
    textAlign: 'center',
  },
});
