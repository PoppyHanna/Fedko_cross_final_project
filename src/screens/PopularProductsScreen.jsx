import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import MaterialCommunityIcons from '@react-native-vector-icons/material-design-icons/static';

import SearchInput from '../components/SearchInput/SearchInput';
import HorizontalProductCard from '../components/HorizontalProductCard/HorizontalProductCard';

import { fetchProducts } from '../api/api';
import { toggleFavorite } from '../redux/favoritesSlice';
import { SCREENS } from '../constants/screens';
import { COLORS } from '../constants/colors';

const ItemSeparator = () => <View style={styles.separator} />;

const PopularProductsScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites.items);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchProducts();

        const popularProducts = data.filter(product => product.popular);

        setProducts(popularProducts);
      } catch (err) {
        setError('Failed to load products');
        console.log('POPULAR PRODUCTS ERROR:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.primaryBrown} />
        <Text style={styles.statusText}>Loading products...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <FlatList
        data={filteredProducts}
        keyExtractor={(item, index) =>
          item?.id ? String(item.id) : String(index)
        }
        ItemSeparatorComponent={ItemSeparator}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <MaterialCommunityIcons
                  name="chevron-left"
                  size={30}
                  color={COLORS.textPrimary}
                />
              </TouchableOpacity>

              <Text style={styles.headerTitle}>Popular products</Text>

              <View style={styles.headerPlaceholder} />
            </View>

            <SearchInput
              placeholder="Search for coffee..."
              onChangeText={setSearch}
            />

            <Text style={styles.sectionTitle}>Popular products</Text>
          </>
        }
        renderItem={({ item }) => (
          <HorizontalProductCard
            image={{ uri: item.image }}
            title={item.shortName}
            price={Number(item.mediumPrice).toFixed(2)}
            isFavorite={favorites.some(
              favorite =>
                (favorite.id ?? favorite.name) === (item.id ?? item.name),
            )}
            onFavoritePress={() => dispatch(toggleFavorite(item))}
            onPress={() =>
              navigation.navigate(SCREENS.COFFEE_DETAILS, {
                productId: item.id,
                product: item,
              })
            }
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 28,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },

  headerPlaceholder: {
    width: 30,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginTop: 28,
    marginBottom: 16,
  },

  separator: {
    height: 16,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },

  statusText: {
    marginTop: 12,
    fontSize: 14,
    color: COLORS.textSecondary,
  },

  errorText: {
    fontSize: 16,
    color: 'red',
  },
});

export default PopularProductsScreen;
