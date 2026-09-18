import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from '@react-native-vector-icons/material-design-icons/static';

import HorizontalProductCard from '../components/HorizontalProductCard/HorizontalProductCard';
import { toggleFavorite } from '../redux/favoritesSlice';
import { COLORS } from '../constants/colors';
import { SCREENS } from '../constants/screens';

const FavoritesScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites.items);

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

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons
            name="chevron-left"
            size={28}
            color={COLORS.textPrimary}
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Favorites</Text>
      </View>

      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            You don't have any favorite coffee yet.
          </Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item, index) =>
            item?.id ? String(item.id) : `${item.name}-${index}`
          }
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <HorizontalProductCard
              product={item}
              imageUri={item.image}
              title={item.name}
              price={Number(item.mediumPrice).toFixed(2)}
              isFavorite={true}
              onFavoritePress={handleFavoritePress}
              onPress={handleProductPress}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'relative',
    alignItems: 'center',
    marginBottom: 20,
  },

  backButton: {
    position: 'absolute',
    left: 0,
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },

  list: {
    gap: 16,
    paddingBottom: 24,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});

export default FavoritesScreen;
