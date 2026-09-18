import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from '@react-native-vector-icons/material-design-icons/static';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import SizeButton from '../components/SizeButton/SizeButton';
import CustomButton from '../components/CustomButton/CustomButton';
import { addItem } from '../redux/cartSlice';
import { toggleFavorite } from '../redux/favoritesSlice';
import { COLORS } from '../constants/colors';

const CoffeeDetailsScreen = ({ route, navigation }) => {
  const { product } = route.params || {};
  const [selectedSize, setSelectedSize] = useState('Medium');
  const [quantity, setQuantity] = useState(1);
  const [showCartMessage, setShowCartMessage] = useState(false);
  const messageOpacity = useSharedValue(0);
  const messageTranslateY = useSharedValue(6);

  const dispatch = useDispatch();

  const favorites = useSelector(state => state.favorites.items);

  const isFavorite = favorites.some(
    favorite =>
      (favorite.id ?? favorite.name) === (product?.id ?? product?.name),
  );

  useEffect(() => {
    if (showCartMessage) {
      messageOpacity.value = withTiming(1, { duration: 500 });
      messageTranslateY.value = withTiming(0, { duration: 500 });
    }
  }, [showCartMessage, messageOpacity, messageTranslateY]);

  const animatedMessageStyle = useAnimatedStyle(() => ({
    opacity: messageOpacity.value,
    transform: [{ translateY: messageTranslateY.value }],
  }));

  if (!product) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.error}>Product not found</Text>
      </View>
    );
  }

  const prices = {
    Small: Number(product.smallPrice),
    Medium: Number(product.mediumPrice),
    Large: Number(product.largePrice),
  };

  const sizes = ['Small', 'Medium', 'Large'];

  const selectedPrice = prices[selectedSize];

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    dispatch(
      addItem({
        ...product,
        size: selectedSize,
        quantity,
        price: selectedPrice,
      }),
    );

    setShowCartMessage(true);

    setTimeout(() => {
      messageOpacity.value = withTiming(0, { duration: 300 });
      messageTranslateY.value = withTiming(6, { duration: 300 });

      setTimeout(() => {
        setShowCartMessage(false);
      }, 300);
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons
              name="chevron-left"
              size={35}
              color={COLORS.textPrimary}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => dispatch(toggleFavorite(product))}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={24}
              color={COLORS.primaryBrown}
            />
          </TouchableOpacity>
        </View>
        <Image
          source={
            typeof product.image === 'string'
              ? { uri: product.image }
              : product.image
          }
          style={styles.image}
          resizeMode="cover"
        />

        <View style={styles.info}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{product.name}</Text>

            <View style={styles.rating}>
              <MaterialCommunityIcons
                name="star"
                size={24}
                color={COLORS.primaryBrown}
              />
              <Text style={styles.ratingText}>{product.rating}</Text>
            </View>
          </View>

          <Text style={styles.description}>{product.description}</Text>
          <Text style={styles.label}>Coffee size</Text>

          <View style={styles.sizes}>
            {sizes.map(size => (
              <SizeButton
                key={size}
                title={size}
                isActive={selectedSize === size}
                onPress={() => setSelectedSize(size)}
              />
            ))}
          </View>

          <View style={styles.quantityRow}>
            <Text style={styles.quantityLabel}>Quantity:</Text>

            <View style={styles.quantityControls}>
              <TouchableOpacity onPress={decreaseQuantity}>
                <MaterialCommunityIcons
                  name="minus"
                  size={24}
                  color={COLORS.primaryBrown}
                />
              </TouchableOpacity>

              <Text style={styles.quantity}>{quantity}</Text>

              <TouchableOpacity onPress={increaseQuantity}>
                <MaterialCommunityIcons
                  name="plus"
                  size={24}
                  color={COLORS.primaryBrown}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.bottomRow}>
            <Text style={styles.price}>
              ${(selectedPrice * quantity).toFixed(2)}
            </Text>

            <View style={styles.addButton}>
              <CustomButton title="Add to Cart" onPress={handleAddToCart} />
            </View>
          </View>

          {showCartMessage && (
            <Animated.View style={[styles.cartMessage, animatedMessageStyle]}>
              <MaterialCommunityIcons
                name="check-circle"
                size={20}
                color={COLORS.white}
              />
              <Text style={styles.cartMessageText}>Added to cart</Text>
            </Animated.View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 16,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    marginBottom: 20,
  },

  image: {
    width: '100%',
    height: 280,
    borderRadius: 6,
  },

  info: {
    marginTop: 16,
  },

  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  ratingText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.primaryBrown,
    marginRight: 8,
  },

  title: {
    fontSize: 32,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },

  description: {
    width: 265,
    fontSize: 16,
    marginTop: 25,
    marginBottom: 25,
    lineHeight: 24,
    color: COLORS.textSecondary,
  },

  label: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: COLORS.textPrimary,
  },

  sizes: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },

  price: {
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },

  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  error: {
    fontSize: 16,
    color: 'red',
  },

  quantityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
  },

  quantityLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },

  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  quantity: {
    fontSize: 24,
    color: COLORS.textPrimary,
  },

  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
  },

  addButton: {
    width: 174,
    borderRadius: 200,
  },

  cartMessage: {
    position: 'absolute',
    bottom: 55,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: COLORS.primaryBrown,
    zIndex: 10,
  },

  cartMessageText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.white,
  },
});

export default CoffeeDetailsScreen;
