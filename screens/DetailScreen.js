import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const DetailScreen = ({ route }) => {
  const { player } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: player.image }} style={styles.image} />
      <Text style={styles.name}>{player.playerName}</Text>
      <Text>Vị trí: {player.position}</Text>
      <Text>Đội: {player.team}</Text>
      <Text>Số phút thi đấu: {player.MinutesPlayed}</Text>
      <Text>Tuổi: {2025 - player.YoB}</Text>
      <Text>Đội trưởng: {player.isCaptain ? "✅ Có" : "❌ Không"}</Text>
      <Text>Độ chính xác chuyền bóng: {player.PassingAccuracy * 100}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  image: { width: 150, height: 150, borderRadius: 75, marginBottom: 10 },
  name: { fontSize: 22, fontWeight: 'bold' },
});

export default DetailScreen;
