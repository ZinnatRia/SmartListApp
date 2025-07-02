import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  BackHandler,
  Text,
  TouchableOpacity,
  Platform,
  Appearance,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';

export default function AddItemScreen({ navigation, route }) {
  const editingItem = route.params?.item;

  const [title, setTitle] = useState(editingItem ? editingItem.title : '');
  const [description, setDescription] = useState(editingItem ? editingItem.description : '');
  const [category, setCategory] = useState(editingItem ? editingItem.category : 'Other');
  const [darkMode, setDarkMode] = useState(Appearance.getColorScheme() === 'dark');

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [navigation]);

  const handleSave = () => {
    if (!title.trim() || !description.trim()) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    const newItem = {
      id: editingItem ? editingItem.id : Date.now().toString(),
      title,
      description,
      category,
    };
    navigation.navigate('Dashboard', {
      ...(editingItem ? { editedItem: newItem } : { newItem }),
    });
  };

  const themeStyles = darkMode ? darkStyles : lightStyles;

  return (
    <View style={[styles.container, themeStyles.container]}>
      <View style={styles.topRow}>
        <Text style={[styles.heading, themeStyles.text]}>
          {editingItem ? '✏️ Edit Item' : '➕ Add Item'}
        </Text>
        <TouchableOpacity onPress={() => setDarkMode((prev) => !prev)}>
          <Ionicons
            name={darkMode ? 'sunny' : 'moon'}
            size={28}
            color={darkMode ? '#66b0ff' : '#333'}
          />
        </TouchableOpacity>
      </View>

      <TextInput
        style={[styles.input, themeStyles.input]}
        placeholder="Title"
        placeholderTextColor={darkMode ? '#aaa' : '#555'}
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={[styles.input, { height: 100 }, themeStyles.input]}
        placeholder="Description"
        placeholderTextColor={darkMode ? '#aaa' : '#555'}
        multiline
        value={description}
        onChangeText={setDescription}
      />

      <Picker
        selectedValue={category}
        style={[styles.picker, themeStyles.input]}
        onValueChange={(itemValue) => setCategory(itemValue)}
      >
        <Picker.Item label="Work" value="Work" />
        <Picker.Item label="Personal" value="Personal" />
        <Picker.Item label="Shopping" value="Shopping" />
        <Picker.Item label="Other" value="Other" />
      </Picker>

      <Button title="Save" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  input: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    marginBottom: 15,
  },
  picker: {
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 20,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

const lightStyles = StyleSheet.create({
  container: { backgroundColor: '#e0f2ff' },
  text: { color: '#000' },
  input: { borderColor: '#aaa', backgroundColor: '#fff', color: '#000' },
});

const darkStyles = StyleSheet.create({
  container: { backgroundColor: '#121212' },
  text: { color: '#eee' },
  input: { borderColor: '#555', backgroundColor: '#333', color: '#eee' },
});
