import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, BackHandler } from 'react-native';

export default function ViewItemScreen({ navigation, route }) {
  const { item } = route.params;

  useEffect(() => {
    const backAction = () => {
      navigation.goBack(); // Go back to Dashboard screen
      return true; // Prevent default behavior
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [navigation]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.divider} />
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#e8f0fe',
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    paddingVertical: 36,
    paddingHorizontal: 28,
    borderRadius: 20,
    width: '100%',
    maxWidth: 480,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 14,
    elevation: 10,
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    color: '#1a237e',
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: 0.6,
  },
  divider: {
    height: 1.5,
    backgroundColor: '#c5cae9',
    marginVertical: 20,
    borderRadius: 1,
  },
  description: {
    fontSize: 20,
    color: '#37474f',
    lineHeight: 32,
    textAlign: 'justify',
    letterSpacing: 0.2,
  },
});
