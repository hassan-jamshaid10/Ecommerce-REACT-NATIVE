import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { theme } from '../theme';

export function QuantityStepper({ quantity, onChange }: { quantity: number; onChange: (q: number) => void }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 14,
        borderColor: theme.colors.border,
        borderWidth: 1,
        overflow: 'hidden',
      }}
    >
      <Pressable
        onPress={() => onChange(Math.max(0, quantity - 1))}
        style={{ paddingHorizontal: 12, paddingVertical: 8, backgroundColor: 'rgba(255,255,255,0.04)' }}
      >
        <Text style={{ color: theme.colors.text, fontSize: 18 }}>−</Text>
      </Pressable>
      <Text style={{ color: theme.colors.text, paddingHorizontal: 14, minWidth: 36, textAlign: 'center' }}>{quantity}</Text>
      <Pressable
        onPress={() => onChange(quantity + 1)}
        style={{ paddingHorizontal: 12, paddingVertical: 8, backgroundColor: 'rgba(255,255,255,0.04)' }}
      >
        <Text style={{ color: theme.colors.text, fontSize: 18 }}>+</Text>
      </Pressable>
    </View>
  );
}