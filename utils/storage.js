import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveFavorite = async (player) => {
  const favorites = JSON.parse(await AsyncStorage.getItem('favorites')) || [];
  if (!favorites.some((p) => p.id === player.id)) {
    favorites.push(player);
    await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
  }
};

export const getFavorites = async () => {
  return JSON.parse(await AsyncStorage.getItem('favorites')) || [];
};
