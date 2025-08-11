import React, { useMemo } from 'react';
import { Image, ScrollView, Text, View, Pressable } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { decrementStock, incrementStock } from '../store/inventorySlice';
import { theme } from '../theme';

export default function ProductDetailScreen({ route }: any) {
  const { id } = route.params as { id: number };
  const product = useSelector((s: RootState) => s.products.items.find(p => p.id === id));
  const stock = useSelector((s: RootState) => s.inventory.productIdToStock[id] ?? product?.stock ?? 0);
  const dispatch = useDispatch<AppDispatch>();

  const priceText = useMemo(() => (product ? `$${product.price.toFixed(2)}` : ''), [product]);

  if (!product) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: theme.colors.textMuted }}>Product not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingHorizontal: theme.spacing(2), paddingTop: theme.spacing(6), paddingBottom: theme.spacing(6) }}>
      <Image source={{ uri: product.images?.[0] ?? product.thumbnail }} style={{ width: '100%', height: 260, borderRadius: theme.radius.lg }} />
      <Text style={{ color: theme.colors.text, fontSize: 26, fontWeight: '800', marginTop: theme.spacing(2) }}>{product.title}</Text>
      <Text style={{ color: theme.colors.textMuted, marginTop: 6 }}>{product.brand} • {product.category}</Text>
      <Text style={{ color: theme.colors.secondary, fontSize: 22, fontWeight: '700', marginTop: theme.spacing(1) }}>{priceText}</Text>
      <Text style={{ color: theme.colors.text, marginTop: theme.spacing(2) }}>{product.description}</Text>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: theme.spacing(3) }}>
        <Pressable onPress={() => dispatch(decrementStock({ productId: id }))} style={{ paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.06)', marginRight: 12 }}>
          <Text style={{ color: theme.colors.text, fontSize: 18 }}>Sell −1</Text>
        </Pressable>
        <Pressable onPress={() => dispatch(incrementStock({ productId: id }))} style={{ paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12, backgroundColor: 'rgba(123,92,255,0.18)', borderWidth: 1, borderColor: theme.colors.primary + '66' }}>
          <Text style={{ color: theme.colors.primary, fontSize: 18 }}>Restock +1</Text>
        </Pressable>
        <View style={{ marginLeft: 'auto' }}>
          <Text style={{ color: theme.colors.textMuted }}>Stock</Text>
          <Text style={{ color: theme.colors.text, fontSize: 20, fontWeight: '800', textAlign: 'right' }}>{stock}</Text>
        </View>
      </View>
    </ScrollView>
  );
}