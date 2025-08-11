import React, { ReactNode } from 'react';
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../theme';

export function FuturisticBackground({ children }: { children: ReactNode }) {
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.backgroundStart }}>
      <LinearGradient
        colors={[theme.colors.backgroundStart, theme.colors.backgroundEnd]}
        style={{ position: 'absolute', inset: 0 }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      {/* Decorative glows */}
      <LinearGradient
        colors={[theme.colors.accent + '66', 'transparent']}
        style={{ position: 'absolute', width: 300, height: 300, borderRadius: 150, top: -60, right: -80 }}
      />
      <LinearGradient
        colors={[theme.colors.secondary + '66', 'transparent']}
        style={{ position: 'absolute', width: 220, height: 220, borderRadius: 110, bottom: 40, left: -40 }}
      />
      <View style={{ flex: 1 }}>{children}</View>
    </View>
  );
}