import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import MaterialCommunityIcons from '@react-native-vector-icons/material-design-icons/static';

import SearchInput from '../components/SearchInput/SearchInput';
import HorizontalProductCard from '../components/HorizontalProductCard/HorizontalProductCard';

import { fetchProducts } from '../api/api';
import { toggleFavorite } from '../redux/favoritesSlice';
import { SCREENS } from '../constants/screens';
import { COLORS } from '../constants/colors';
import { SHADOWS } from '../constants/shadows';

const categories = [
  {
    id: 'hot',
    title: 'Hot coffee',
    image: require('../assets/images/categories/hot_coffee.png'),
  },
  {
    id: 'cold',
    title: 'Cold coffee',
    image: require('../assets/images/categories/cold_coffee.png'),
  },
  {
    id: 'iced',
    title: 'Iced drinks',
    image: require('../assets/images/categories/iced_drinks.png'),
  },
];

const ItemSeparator = () => <View style={styles.separator} />;

const CategoryProductsScreen = ({ navigation, route }) => {
  const { category = 'hot' } = route.params || {};

  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState(category);
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
        setProducts(data);
      } catch (err) {
        setError('Failed to load products');
        console.log('CATEGORY PRODUCTS ERROR:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return products.filter(product => {
      const matchesCategory = product.category === activeCategory;
      const matchesSearch = product.name.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [products, activeCategory, search]);

  const handleFavoritePress = useCallback(
    product => {
      dispatch(toggleFavorite(product));
    },
    [dispatch],
  );

  const handleProductPress = useCallback(
    product => {
      navigation.navigate(SCREENS.COFFEE_DETAILS, {
        productId: product.id,
        product,
      });
    },
    [navigation],
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

              <Text style={styles.headerTitle}>Coffee categories</Text>

              <View style={styles.headerPlaceholder} />
            </View>

            <SearchInput
              placeholder="Search for coffee..."
              onChangeText={setSearch}
            />

            <View style={styles.categories}>
              {categories.map(item => {
                const isActive = activeCategory === item.id;

                return (
                  <TouchableOpacity
                    key={item.id}
                    style={[
                      styles.categoryCard,
                      isActive && styles.activeCategoryCard,
                    ]}
                    onPress={() => setActiveCategory(item.id)}
                  >
                    <Image source={item.image} style={styles.categoryImage} />

                    <View style={styles.categoryOverlay} />

                    <Text style={styles.categoryTitle}>{item.title}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <Text style={styles.sectionTitle}>
              {categories.find(item => item.id === activeCategory)?.title}
            </Text>
          </>
        }
        renderItem={({ item }) => (
          <HorizontalProductCard
            product={item}
            imageUri={item.image}
            title={item.shortName}
            price={Number(item.mediumPrice).toFixed(2)}
            isFavorite={favorites.some(
              favorite =>
                (favorite.id ?? favorite.name) === (item.id ?? item.name),
            )}
            onFavoritePress={handleFavoritePress}
            onPress={handleProductPress}
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

  categories: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 24,
  },

  categoryCard: {
    width: 105,
    height: 85,
    borderRadius: 6,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 2,
    borderColor: 'transparent',
  },

  activeCategoryCard: {
    borderColor: COLORS.primaryBrown,
    ...SHADOWS.default,
  },

  categoryImage: {
    width: '100%',
    height: '100%',
  },

  categoryOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },

  categoryTitle: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textPrimary,
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

export default CategoryProductsScreen;
