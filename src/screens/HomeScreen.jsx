import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import MaterialCommunityIcons from '@react-native-vector-icons/material-design-icons/static';

import { fetchProducts } from '../api/api';
import SearchInput from '../components/SearchInput/SearchInput';
import CategoryCard from '../components/CategoryCard/CategoryCard';
import VerticalProductCard from '../components/VerticalProductCard/VerticalProductCard';

import { useUser } from '../context/UserContext';
import { toggleFavorite } from '../redux/favoritesSlice';

import { SCREENS } from '../constants/screens';
import { COLORS } from '../constants/colors';

const HomeScreen = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([]);

  const dispatch = useDispatch();

  const favorites = useSelector(state => state.favorites.items);

  const { user } = useUser();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.log('HOME API ERROR:', error);
      }
    };

    loadProducts();
  }, []);

  const popularProducts = products
    .filter(product => product.popular)
    .slice(0, 2);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <MaterialCommunityIcons
            name="menu"
            size={24}
            color={COLORS.textPrimary}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate(SCREENS.CART)}>
          <MaterialCommunityIcons
            name="cart-outline"
            size={22}
            color={COLORS.textPrimary}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Good morning, {user.name}!</Text>
      <Text style={styles.subtitle}>What do you like?</Text>

      <SearchInput
        value={search}
        onChangeText={setSearch}
        placeholder="Search for coffee..."
      />

      <View style={styles.categories}>
        <CategoryCard
          title="Hot coffee"
          image={require('../assets/images/categories/hot_coffee.png')}
          onPress={() =>
            navigation.navigate(SCREENS.CATEGORY_PRODUCTS, {
              category: 'hot',
            })
          }
        />

        <CategoryCard
          title="Cold coffee"
          image={require('../assets/images/categories/cold_coffee.png')}
          onPress={() =>
            navigation.navigate(SCREENS.CATEGORY_PRODUCTS, {
              category: 'cold',
            })
          }
        />

        <CategoryCard
          title="Iced drinks"
          image={require('../assets/images/categories/iced_drinks.png')}
          onPress={() =>
            navigation.navigate(SCREENS.CATEGORY_PRODUCTS, {
              category: 'iced',
            })
          }
        />
      </View>

      <View style={styles.popularHeader}>
        <Text style={styles.sectionTitle}>Popular products</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate(SCREENS.POPULAR_PRODUCTS)}
        >
          <Text style={styles.seeAll}>See all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.productsRow}>
        {popularProducts.map((product, index) => (
          <VerticalProductCard
            key={product?.id ? String(product.id) : `${product.name}-${index}`}
            title={product.name}
            image={{ uri: product.image }}
            price={`$${Number(product.mediumPrice).toFixed(2)}`}
            isFavorite={favorites.some(
              favorite =>
                (favorite.id ?? favorite.name) === (product.id ?? product.name),
            )}
            onFavoritePress={() => dispatch(toggleFavorite(product))}
            onPress={() =>
              navigation.navigate(SCREENS.COFFEE_DETAILS, {
                productId: product.id,
                product,
              })
            }
          />
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 24,
    paddingTop: 8,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 36,
  },

  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginBottom: 21,
  },

  categories: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
    marginTop: 20,
    marginBottom: 20,
  },

  popularHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 25,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },

  seeAll: {
    fontSize: 14,
    color: COLORS.textPrimary,
  },

  productsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default HomeScreen;
