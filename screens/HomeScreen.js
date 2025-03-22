import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { getPlayers } from '../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons'; // Import icon trái tim

const HomeScreen = ({ navigation }) => {
  const [players, setPlayers] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchPlayers();
    loadFavorites();
  }, []);

  const fetchPlayers = async () => {
    const data = await getPlayers();
    if (Array.isArray(data)) {
      setPlayers(data);
    } else {
      setPlayers([]);
    }
  };

  const loadFavorites = async () => {
    const favs = await AsyncStorage.getItem('favorites');
    if (favs) {
      setFavorites(JSON.parse(favs));
    }
  };

  const toggleFavorite = async (player) => {
    let updatedFavorites;
    if (favorites.some((fav) => fav.id === player.id)) {
      updatedFavorites = favorites.filter((fav) => fav.id !== player.id);
    } else {
      updatedFavorites = [...favorites, player];
    }

    setFavorites(updatedFavorites);
    await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const isFavorite = (playerId) => {
    return favorites.some((fav) => fav.id === playerId);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={players}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity onPress={() => navigation.navigate('Detail', { player: item })}>
              <Image source={{ uri: item.image }} style={styles.image} />
            </TouchableOpacity>
            <View style={styles.info}>
              <TouchableOpacity onPress={() => navigation.navigate('Detail', { player: item })}>
                <Text style={styles.name}>{item.playerName}</Text>
              </TouchableOpacity>
              <Text>{item.position}</Text>
              <Text>{2025 - item.YoB} tuổi</Text>
            </View>
            <TouchableOpacity onPress={() => toggleFavorite(item)}>
              <AntDesign 
                name={isFavorite(item.id) ? 'heart' : 'hearto'} 
                size={24} 
                color={isFavorite(item.id) ? 'red' : 'gray'} 
                style={styles.heartIcon}
              />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  card: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#f9f9f9', 
    padding: 10, 
    borderRadius: 10, 
    marginBottom: 10 
  },
  image: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
  info: { flex: 1 },
  name: { fontSize: 16, fontWeight: 'bold' },
  heartIcon: { marginLeft: 10 },
});

export default HomeScreen;