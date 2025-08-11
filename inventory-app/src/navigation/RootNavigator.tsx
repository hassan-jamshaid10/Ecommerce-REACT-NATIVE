import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductsScreen from '../screens/ProductsScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import InventoryScreen from '../screens/InventoryScreen';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme';
import { BlurView } from 'expo-blur';
import { Platform } from 'react-native';

const Tab = createBottomTabNavigator();
const ShopStack = createNativeStackNavigator();
const InventoryStack = createNativeStackNavigator();

function ShopStackNavigator() {
  return (
    <ShopStack.Navigator
      screenOptions={{
        headerTransparent: true,
        headerTitle: '',
        contentStyle: { backgroundColor: 'transparent' },
      }}
    >
      <ShopStack.Screen name="Products" component={ProductsScreen} />
      <ShopStack.Screen name="ProductDetail" component={ProductDetailScreen} />
    </ShopStack.Navigator>
  );
}

function InventoryStackNavigator() {
  return (
    <InventoryStack.Navigator
      screenOptions={{
        headerTransparent: true,
        headerTitle: '',
        contentStyle: { backgroundColor: 'transparent' },
      }}
    >
      <InventoryStack.Screen name="Inventory" component={InventoryScreen} />
    </InventoryStack.Navigator>
  );
}

export default function RootNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        header: ({ options }) => (
          <BlurView intensity={30} tint="dark" style={{ height: Platform.OS === 'ios' ? 100 : 80 }} />
        ),
        tabBarBackground: () => <BlurView intensity={30} tint="dark" style={{ flex: 1 }} />,
        tabBarStyle: {
          backgroundColor: 'transparent',
          borderTopColor: 'rgba(255,255,255,0.1)',
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textMuted,
      }}
    >
      <Tab.Screen
        name="Shop"
        component={ShopStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="bag-outline" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="InventoryTab"
        component={InventoryStackNavigator}
        options={{
          title: 'Inventory',
          tabBarIcon: ({ color, size }) => <Ionicons name="cube-outline" size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}