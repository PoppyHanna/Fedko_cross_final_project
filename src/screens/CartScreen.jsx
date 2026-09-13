import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import PromoCodeInput from '../components/PromoCodeInput/PromoCodeInput';
import CustomButton from '../components/CustomButton/CustomButton';
import MaterialCommunityIcons from '@react-native-vector-icons/material-design-icons/static';

import { removeItem, updateQuantity, updateSize } from '../redux/cartSlice';
import { SCREENS } from '../constants/screens';
import { COLORS } from '../constants/colors';

const CartScreen = ({ navigation }) => {
  const [promoCode, setPromoCode] = useState('');
  const [openSizeIndex, setOpenSizeIndex] = useState(null);

  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const tax = subtotal * 0.08;
  const total = subtotal + tax;

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

        <Text style={styles.headerTitle}>Your cart</Text>
      </View>

      {cartItems.length === 0 ? (
        <Text style={styles.emptyText}>Your cart is empty</Text>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item, index) => `${item.id}-${item.size}-${index}`}
            renderItem={({ item, index }) => (
              <View style={styles.cartItem}>
                <Image
                  source={
                    typeof item.image === 'string'
                      ? { uri: item.image }
                      : item.image
                  }
                  style={styles.image}
                  resizeMode="cover"
                />

                <View style={styles.info}>
                  <Text style={styles.name}>{item.name}</Text>

                  <View style={styles.sizeContainer}>
                    <TouchableOpacity
                      style={styles.sizeRow}
                      onPress={() =>
                        setOpenSizeIndex(openSizeIndex === index ? null : index)
                      }
                      activeOpacity={0.7}
                    >
                      <Text style={styles.details}>Size:</Text>

                      <View style={styles.selectedSize}>
                        <Text style={styles.sizeValue}>{item.size}</Text>

                        <MaterialCommunityIcons
                          name={
                            openSizeIndex === index
                              ? 'chevron-up'
                              : 'chevron-down'
                          }
                          size={18}
                          color={COLORS.primaryBrown}
                        />
                      </View>
                    </TouchableOpacity>

                    {openSizeIndex === index && (
                      <View style={styles.sizeOptions}>
                        {['Small', 'Medium', 'Large'].map(size => {
                          const priceMap = {
                            Small: Number(item.smallPrice),
                            Medium: Number(item.mediumPrice),
                            Large: Number(item.largePrice),
                          };

                          const isActive = item.size === size;

                          return (
                            <TouchableOpacity
                              key={size}
                              style={[
                                styles.sizeButton,
                                isActive && styles.activeSizeButton,
                              ]}
                              onPress={() => {
                                dispatch(
                                  updateSize({
                                    index,
                                    size,
                                    price: priceMap[size],
                                  }),
                                );

                                setOpenSizeIndex(null);
                              }}
                              activeOpacity={0.7}
                            >
                              <Text
                                style={[
                                  styles.sizeButtonText,
                                  isActive && styles.activeSizeButtonText,
                                ]}
                              >
                                {size}
                              </Text>
                            </TouchableOpacity>
                          );
                        })}
                      </View>
                    )}
                  </View>

                  <View style={styles.quantityRow}>
                    <Text style={styles.details}>Quantity:</Text>
                    <View style={styles.quantityControls}>
                      <TouchableOpacity
                        onPress={() =>
                          dispatch(
                            updateQuantity({
                              index,
                              quantity: Math.max(1, item.quantity - 1),
                            }),
                          )
                        }
                        activeOpacity={0.7}
                      >
                        <MaterialCommunityIcons
                          name="minus"
                          size={20}
                          color={COLORS.primaryBrown}
                        />
                      </TouchableOpacity>

                      <Text style={styles.quantityValue}>{item.quantity}</Text>

                      <TouchableOpacity
                        onPress={() =>
                          dispatch(
                            updateQuantity({
                              index,
                              quantity: item.quantity + 1,
                            }),
                          )
                        }
                        activeOpacity={0.7}
                      >
                        <MaterialCommunityIcons
                          name="plus"
                          size={20}
                          color={COLORS.primaryBrown}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={styles.priceRow}>
                    <Text style={styles.price}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </Text>

                    <TouchableOpacity
                      onPress={() => dispatch(removeItem(index))}
                      activeOpacity={0.7}
                    >
                      <MaterialCommunityIcons
                        name="trash-can-outline"
                        size={22}
                        color={COLORS.primaryBrown}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
            style={styles.cartList}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />

          <PromoCodeInput
            value={promoCode}
            onChangeText={setPromoCode}
            onSubmit={() => {}}
            placeholder="Add promo code"
          />

          <View style={styles.summary}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal:</Text>
              <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Tax:</Text>
              <Text style={styles.summaryValue}>${tax.toFixed(2)}</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Total:</Text>
              <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
            </View>
          </View>

          <CustomButton
            title="Checkout"
            onPress={() => navigation.navigate(SCREENS.CHECKOUT)}
          />
        </>
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
    paddingBottom: 16,
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

  emptyText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 40,
  },

  cartList: {
    maxHeight: 356,
    marginBottom: 16,
  },

  listContent: {
    gap: 12,
  },

  cartItem: {
    flexDirection: 'row',
    height: 162,
    backgroundColor: COLORS.lightBeige,
    borderRadius: 6,
    overflow: 'hidden',
  },

  image: {
    width: 145,
    height: '100%',
  },

  info: {
    flex: 1,
    paddingHorizontal: 22,
    paddingVertical: 22,
    justifyContent: 'space-between',
  },

  name: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },

  details: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },

  sizeContainer: {
    width: '100%',
  },

  sizeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  selectedSize: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },

  sizeValue: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },

  sizeOptions: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 6,
  },

  sizeButton: {
    flex: 1,
    paddingVertical: 5,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.primaryBrown,
    alignItems: 'center',
  },

  activeSizeButton: {
    backgroundColor: COLORS.primaryBrown,
  },

  sizeButtonText: {
    fontSize: 11,
    color: COLORS.primaryBrown,
  },

  activeSizeButtonText: {
    color: COLORS.background,
  },

  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  quantityValue: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
    minWidth: 18,
    textAlign: 'center',
  },

  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },

  price: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },

  summary: {
    marginTop: 10,
    marginBottom: 35,
    gap: 8,
  },

  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  summaryLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },

  summaryValue: {
    fontSize: 14,
    color: COLORS.textPrimary,
  },

  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },

  totalValue: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
});

export default CartScreen;
