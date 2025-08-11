import React, { useMemo } from 'react';
import { FlatList, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { decrementStock, incrementStock, setStock } from '../store/inventorySlice';
import { theme } from '../theme';
import { QuantityStepper } from '../components/QuantityStepper';

export default function InventoryScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const { items: products } = useSelector((s: RootState) => s.products);
  const productIdToStock = useSelector((s: RootState) => s.inventory.productIdToStock);

  const rows = useMemo(() => products.map(p => ({
    id: p.id,
    title: p.title,
    stock: productIdToStock[p.id] ?? p.stock ?? 0,
    thumbnail: p.thumbnail,
    price: p.price,
  })), [products, productIdToStock]);

  return (
    <View style={{ flex: 1, paddingHorizontal: theme.spacing(2), paddingTop: theme.spacing(6) }}>
      <Text style={{ color: theme.colors.text, fontSize: 28, fontWeight: '800', marginBottom: theme.spacing(2) }}>Inventory</Text>
      <FlatList
        data={rows}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: theme.colors.border }}>
            <View style={{ flex: 1 }}>
              <Text style={{ color: theme.colors.text }} numberOfLines={1}>{item.title}</Text>
              <Text style={{ color: theme.colors.textMuted, fontSize: 12 }}>${item.price.toFixed(2)}</Text>
            </View>
            <View style={{ marginRight: 12, alignItems: 'flex-end' }}>
              <Text style={{ color: theme.colors.textMuted, fontSize: 12 }}>Stock</Text>
              <Text style={{ color: theme.colors.text, fontWeight: '800' }}>{item.stock}</Text>
            </View>
            <QuantityStepper
              quantity={item.stock}
              onChange={(q) => dispatch(setStock({ productId: item.id, quantity: q }))}
            />
          </View>
        )}
        contentContainerStyle={{ paddingBottom: theme.spacing(6) }}
      />
    </View>
  );
}