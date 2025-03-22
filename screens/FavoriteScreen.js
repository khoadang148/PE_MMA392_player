import React, { useEffect, useState, useCallback } from 'react';
import { View, FlatList, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

const FavoriteScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);

  useFocusEffect(
    useCallback(() => {
      fetchFavorites();
    }, [])
  );

  const fetchFavorites = async () => {
    const favs = await AsyncStorage.getItem('favorites');
    setFavorites(favs ? JSON.parse(favs) : []);
  };

  const confirmRemoveFavorite = (player) => {
    Alert.alert(
      "Xác nhận",
      `Bạn có chắc chắn muốn xóa ${player.playerName} khỏi danh sách yêu thích không?`,
      [
        { text: "Hủy", style: "cancel" },
        { text: "Xóa", onPress: () => removeFavorite(player), style: "destructive" }
      ]
    );
  };

  const removeFavorite = async (player) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== player.id);
    setFavorites(updatedFavorites);
    await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <Text style={styles.emptyText}>Chưa có cầu thủ yêu thích!</Text>
      ) : (
        <FlatList
          data={favorites}
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
              <TouchableOpacity onPress={() => confirmRemoveFavorite(item)}>
                <AntDesign 
                  name="heart" 
                  size={24} 
                  color="red"
                  style={styles.heartIcon}
                />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  emptyText: { textAlign: 'center', fontSize: 18, marginTop: 20 },
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

export default FavoriteScreen;
