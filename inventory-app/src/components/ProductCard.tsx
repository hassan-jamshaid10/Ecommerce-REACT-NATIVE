import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { theme } from '../theme';

export type ProductCardProps = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  stock?: number;
  onPress?: () => void;
};

export default function ProductCard({ id, title, price, thumbnail, stock = 0, onPress }: ProductCardProps) {
  return (
    <Pressable onPress={onPress} style={{ flex: 1, margin: theme.spacing(1) }}>
      <View
        style={{
          borderRadius: theme.radius.lg,
          overflow: 'hidden',
          backgroundColor: theme.colors.card,
          borderWidth: 1,
          borderColor: theme.colors.border,
        }}
      >
        <Image source={{ uri: thumbnail }} style={{ width: '100%', height: 130 }} resizeMode="cover" />
        <View style={{ padding: theme.spacing(1.2) }}>
          <Text style={{ color: theme.colors.text, fontWeight: '600' }} numberOfLines={1}>
            {title}
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 }}>
            <Text style={{ color: theme.colors.secondary, fontWeight: '700' }}>${price.toFixed(2)}</Text>
            <View
              style={{
                paddingHorizontal: 8,
                paddingVertical: 2,
                borderRadius: 12,
                backgroundColor: 'rgba(123,92,255,0.15)',
                borderWidth: 1,
                borderColor: theme.colors.primary + '55',
              }}
            >
              <Text style={{ color: theme.colors.primary, fontSize: 12 }}>Stock: {stock}</Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
}