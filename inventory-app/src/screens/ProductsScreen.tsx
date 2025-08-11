import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { fetchProducts } from '../store/productsSlice';
import { initializeStockFromProducts } from '../store/inventorySlice';
import ProductCard from '../components/ProductCard';
import { SearchBar } from '../components/SearchBar';
import { theme } from '../theme';

export default function ProductsScreen({ navigation }: any) {
  const dispatch = useDispatch<AppDispatch>();
  const { items: products, status, categories } = useSelector((s: RootState) => s.products);
  const inventory = useSelector((s: RootState) => s.inventory.productIdToStock);
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts()).then((res: any) => {
        const prods = res.payload ?? [];
        dispatch(
          initializeStockFromProducts(
            prods.map((p: any) => ({ id: p.id, stock: p.stock }))
          )
        );
      });
    }
  }, [status]);

  const filtered = useMemo(() => {
    return products.filter(p => {
      const q = query.toLowerCase();
      const matchesQuery = !q || p.title.toLowerCase().includes(q) || p.brand?.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
      const matchesCategory = !selectedCategory || p.category === selectedCategory;
      return matchesQuery && matchesCategory;
    });
  }, [products, query, selectedCategory]);

  return (
    <View style={{ flex: 1, paddingHorizontal: theme.spacing(2), paddingTop: theme.spacing(6) }}>
      <Text style={{ color: theme.colors.text, fontSize: 28, fontWeight: '800', marginBottom: theme.spacing(2) }}>Shop</Text>
      <SearchBar value={query} onChange={setQuery} />

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginVertical: theme.spacing(1) }}>
        <Pressable onPress={() => setSelectedCategory(null)} style={{ marginRight: 8, marginBottom: 8 }}>
          <Text style={{ color: selectedCategory ? theme.colors.textMuted : theme.colors.secondary, fontWeight: '700' }}>All</Text>
        </Pressable>
        {categories.map((cat) => (
          <Pressable key={cat} onPress={() => setSelectedCategory(cat)} style={{ marginRight: 8, marginBottom: 8 }}>
            <Text style={{ color: selectedCategory === cat ? theme.colors.secondary : theme.colors.textMuted }}>{cat}</Text>
          </Pressable>
        ))}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <ProductCard
            id={item.id}
            title={item.title}
            price={item.price}
            thumbnail={item.thumbnail}
            stock={inventory[item.id] ?? item.stock ?? 0}
            onPress={() => navigation.navigate('ProductDetail', { id: item.id })}
          />
        )}
        numColumns={2}
        contentContainerStyle={{ paddingBottom: theme.spacing(6) }}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={{ height: theme.spacing(2) }} />}
      />
    </View>
  );
}