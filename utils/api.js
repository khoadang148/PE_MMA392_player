import { API_URL } from '@env';

export const getPlayers = async () => {
  try {
    const response = await fetch(`${API_URL}/players`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching players:', error);
    return [];
  }
};
