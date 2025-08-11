import React from 'react';
import { TextInput, View } from 'react-native';
import { theme } from '../theme';

export function SearchBar({ value, onChange, placeholder = 'Search products' }: { value: string; onChange: (t: string) => void; placeholder?: string }) {
  return (
    <View
      style={{
        borderRadius: 16,
        borderColor: theme.colors.border,
        borderWidth: 1,
        paddingHorizontal: 12,
        backgroundColor: 'rgba(255,255,255,0.03)'
      }}
    >
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textMuted}
        style={{ color: theme.colors.text, paddingVertical: 10 }}
      />
    </View>
  );
}