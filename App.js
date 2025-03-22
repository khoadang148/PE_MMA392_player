import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons'; // Thêm icon

import HomeScreen from './screens/HomeScreen';
import FavoriteScreen from './screens/FavoriteScreen';
import CaptainsScreen from './screens/CaptainsScreen';
import DetailScreen from './screens/DetailScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack Navigator cho Home + Detail
const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: true }}>
    <Stack.Screen name="HomeMain" component={HomeScreen} options={{ title: "🏠 Trang Chủ" }} />
    <Stack.Screen name="Detail" component={DetailScreen} options={{ title: "📌 Chi tiết cầu thủ" }} />
  </Stack.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home';
              return <AntDesign name={iconName} size={size} color={color} />;
            } else if (route.name === 'Favorites') {
              iconName = 'heart';
              return <FontAwesome5 name={iconName} size={size} color={color} />;
            } else if (route.name === 'Captains') {
              iconName = 'user-tie';
              return <FontAwesome5 name={iconName} size={size} color={color} />;
            }
          },
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeStack} options={{ title: "Trang Chủ" }} />
        <Tab.Screen name="Favorites" component={FavoriteScreen} options={{ title: "Yêu Thích" }} />
        <Tab.Screen name="Captains" component={CaptainsScreen} options={{ title: "Đội Trưởng" }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
