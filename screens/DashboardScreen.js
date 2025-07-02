import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  LayoutAnimation,
  UIManager,
  Platform,
  Alert,
  Share,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const categories = ['All', 'Work', 'Personal', 'Shopping', 'Other'];

export default function DashboardScreen({ navigation, route }) {
  const [data, setData] = useState([
    { id: '1', title: 'Buy groceries', description: 'Milk, Eggs, Bread', category: 'Shopping' },
    { id: '2', title: 'Finish project', description: 'Complete by Monday', category: 'Work' },
    { id: '3', title: 'Call Mom', description: 'Her birthday is coming', category: 'Personal' },
    { id: '4', title: 'Book flight tickets', description: 'Vacation plan', category: 'Personal' },
    { id: '5', title: 'Pay bills', description: 'Electricity and water', category: 'Other' },
  ]);

  const [filteredData, setFilteredData] = useState(data);
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    let filtered = data;
    if (selectedCategory !== 'All') {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }
    if (searchText.trim()) {
      filtered = filtered.filter((item) =>
        item.title.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    setFilteredData(filtered);
  }, [data, searchText, selectedCategory]);

  useEffect(() => {
    if (!route.params) return;

    const { newItem, editedItem } = route.params;

    let updated = false;

    if (newItem) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setData((prev) => [...prev, newItem]);
      updated = true;
    }

    if (editedItem) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setData((prev) =>
        prev.map((item) => (item.id === editedItem.id ? editedItem : item))
      );
      updated = true;
    }

    if (updated) {
      navigation.setParams({ newItem: undefined, editedItem: undefined });
    }
  }, [route.params, navigation]);

  const handleAdd = () => navigation.navigate('AddItem');
  const handleEdit = (item) => navigation.navigate('AddItem', { item });
  const handleView = (item) => navigation.navigate('ViewItem', { item });

  const handleDelete = (id) => {
    Alert.alert('Delete', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setData((prev) => prev.filter((item) => item.id !== id));
        },
      },
    ]);
  };

  const handleShare = async (item) => {
    try {
      await Share.share({
        message: `Check out this item: ${item.title}\n\n${item.description}`,
      });
    } catch (error) {
      Alert.alert('Error', 'Could not share item');
    }
  };

  const themeStyles = darkMode ? darkStyles : lightStyles;

  return (
    <View style={[baseStyles.container, themeStyles.container]}>
      <View style={baseStyles.topRow}>
        <Text style={[baseStyles.title, themeStyles.text]}>🗂️ My Dashboard</Text>
        <TouchableOpacity onPress={() => setDarkMode((prev) => !prev)}>
          <Ionicons
            name={darkMode ? 'sunny' : 'moon'}
            size={28}
            color={darkMode ? '#66b0ff' : '#333'}
          />
        </TouchableOpacity>
      </View>

      <Text style={[baseStyles.subtitle, themeStyles.text]}>
        {filteredData.length} {filteredData.length === 1 ? 'Item' : 'Items'} Found
      </Text>

      <View style={baseStyles.filterRow}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[
              baseStyles.categoryBtn,
              selectedCategory === cat ? themeStyles.categorySelected : themeStyles.categoryBtn,
            ]}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text
              style={
                selectedCategory === cat
                  ? themeStyles.categoryTextSelected
                  : themeStyles.categoryText
              }
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        placeholder="Search items..."
        placeholderTextColor={darkMode ? '#ccc' : '#555'}
        style={[baseStyles.searchInput, themeStyles.searchInput]}
        value={searchText}
        onChangeText={setSearchText}
      />

      <TouchableOpacity style={baseStyles.addBtn} onPress={handleAdd}>
        <Text style={baseStyles.addBtnText}>+ Add Item</Text>
      </TouchableOpacity>

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <View style={[baseStyles.itemCard, themeStyles.itemCard]}>
            <Text style={[baseStyles.itemTitle, themeStyles.text]}>{item.title}</Text>
            <Text style={[baseStyles.itemDesc, themeStyles.textSecondary]}>{item.description}</Text>
            <Text style={[baseStyles.itemCategory, themeStyles.textSecondary]}>{item.category}</Text>

            <View style={baseStyles.buttonRow}>
              <TouchableOpacity
                style={[baseStyles.buttonCommon, { backgroundColor: '#6c757d' }]}
                onPress={() => handleView(item)}
              >
                <Text style={baseStyles.btnText}>View</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[baseStyles.buttonCommon, baseStyles.editBtn]}
                onPress={() => handleEdit(item)}
              >
                <Text style={baseStyles.btnText}>Edit</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[baseStyles.buttonCommon, baseStyles.deleteBtn]}
                onPress={() => handleDelete(item.id)}
              >
                <Text style={baseStyles.btnText}>Delete</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[baseStyles.buttonCommon, baseStyles.shareBtn]}
                onPress={() => handleShare(item)}
              >
                <Text style={baseStyles.btnText}>Share</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={[baseStyles.emptyText, themeStyles.textSecondary]}>No items found</Text>
        }
      />
    </View>
  );
}

const baseStyles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 40 },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 28, marginBottom: 4, fontWeight: 'bold', color: '#007bff' },
  subtitle: { fontSize: 16, marginBottom: 12 },
  searchInput: {
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 8,
    fontSize: 16,
    borderWidth: 1,
    marginBottom: 15,
  },
  itemCard: {
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  itemTitle: { fontSize: 20, fontWeight: '700', marginBottom: 4 },
  itemDesc: { fontSize: 16, marginBottom: 4 },
  itemCategory: { fontSize: 14, fontStyle: 'italic', marginBottom: 8 },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between' },
  buttonCommon: {
    flex: 1,
    marginHorizontal: 4,
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  editBtn: { backgroundColor: '#ffc107' },
  deleteBtn: { backgroundColor: '#dc3545' },
  shareBtn: { backgroundColor: '#28a745' },
  btnText: { color: 'white', fontWeight: '600' },
  addBtn: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 10,
    marginVertical: 15,
    alignItems: 'center',
  },
  addBtnText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  emptyText: { textAlign: 'center', fontSize: 18, marginTop: 50 },
  filterRow: { flexDirection: 'row', marginBottom: 10, flexWrap: 'wrap' },
  categoryBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
    marginBottom: 8,
  },
});

const lightStyles = StyleSheet.create({
  container: { backgroundColor: '#f0f4f7' },
  text: { color: '#333' },
  textSecondary: { color: '#666' },
  searchInput: { borderColor: '#ccc', color: '#000' },
  itemCard: { backgroundColor: '#4facfe' },
  categoryBtn: { borderColor: '#007bff' },
  categoryText: { color: '#007bff', fontWeight: '500' },
  categorySelected: { backgroundColor: '#007bff', borderColor: '#007bff' },
  categoryTextSelected: { color: 'white', fontWeight: '700' },
});

const darkStyles = StyleSheet.create({
  container: { backgroundColor: '#121212' },
  text: { color: '#eee' },
  textSecondary: { color: '#aaa' },
  searchInput: { borderColor: '#555', color: '#eee' },
  itemCard: { backgroundColor: '#333' },
  categoryBtn: { borderColor: '#66b0ff' },
  categoryText: { color: '#66b0ff', fontWeight: '500' },
  categorySelected: { backgroundColor: '#66b0ff', borderColor: '#66b0ff' },
  categoryTextSelected: { color: 'black', fontWeight: '700' },
});
