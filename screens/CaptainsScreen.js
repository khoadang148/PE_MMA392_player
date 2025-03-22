import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { getPlayers } from '../utils/api';

const CaptainsScreen = ({ navigation }) => {
  const [players, setPlayers] = useState([]); // Đảm bảo state `players` tồn tại

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    const data = await getPlayers();
    if (Array.isArray(data)) {
      setPlayers(data);
    } else {
      setPlayers([]); // Đảm bảo `players` luôn là mảng
    }
  };

  const captains = players
    .filter(player => player.isCaptain && (2025 - player.YoB) > 34)
    .sort((a, b) => a.MinutesPlayed - b.MinutesPlayed);

  return (
    <View style={styles.container}>
      <FlatList
        data={captains}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Detail', { player: item })}>
            <View style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View>
                <Text style={styles.name}>{item.playerName} (⚽ Captain)</Text>
                <Text>Đội: {item.team}</Text>
                <Text>Vị trí: {item.position}</Text>
                <Text>Số phút thi đấu: {item.MinutesPlayed}</Text>
                <Text>Tuổi: {2025 - item.YoB}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  card: { flexDirection: 'row', marginBottom: 10, alignItems: 'center', backgroundColor: '#f8f9fa', padding: 10, borderRadius: 10 },
  image: { width: 60, height: 60, borderRadius: 30, marginRight: 10 },
  name: { fontSize: 16, fontWeight: 'bold', color: 'blue' },
});

export default CaptainsScreen;
