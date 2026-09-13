import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../api/api';

import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import { DrawerActions } from '@react-navigation/native';
import MaterialCommunityIcons from '@react-native-vector-icons/material-design-icons/static';

import SearchInput from '../components/SearchInput/SearchInput';
import CategoryCard from '../components/CategoryCard/CategoryCard';
import HorizontalProductCard from '../components/HorizontalProductCard/HorizontalProductCard';

import { toggleFavorite } from '../redux/favoritesSlice';

import { SCREENS } from '../constants/screens';
import { COLORS } from '../constants/colors';

const ItemSeparator = () => <View style={styles.separator} />;

const MenuScreen = ({ navigation }) => {
  const [apiProducts, setApiProducts] = useState([]);
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

        setApiProducts(data);
      } catch (err) {
        setError('Failed to load products');
        console.log('API ERROR:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

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
        data={apiProducts}
        keyExtractor={(item, index) =>
          item?.id ? String(item.id) : String(index)
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              >
                <MaterialCommunityIcons
                  name="menu"
                  size={22}
                  color={COLORS.textPrimary}
                />
              </TouchableOpacity>

              <Text style={styles.headerTitle}>Menu</Text>

              <TouchableOpacity
                onPress={() => navigation.navigate(SCREENS.CART)}
              >
                <MaterialCommunityIcons
                  name="cart-outline"
                  size={22}
                  color={COLORS.textPrimary}
                />
              </TouchableOpacity>
            </View>

            <SearchInput
              placeholder="Search for coffee..."
              onChangeText={() => {}}
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

            <Text style={styles.sectionTitle}>Coffee menu</Text>
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
    paddingBottom: 40,
  },
  separator: {
    height: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 28,
  },

  categories: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
    marginTop: 10,
    marginBottom: 20,
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginTop: 18,
    marginBottom: 12,
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

export default MenuScreen;
