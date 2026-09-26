import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Alert,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from '@react-native-vector-icons/material-design-icons/static';

import CustomButton from '../components/CustomButton/CustomButton';
import { TAX_RATE } from '../constants/taxes';

import { addOrder } from '../redux/ordersSlice';
import { clearCart } from '../redux/cartSlice';
import { SCREENS } from '../constants/screens';

import { COLORS } from '../constants/colors';

const CheckoutScreen = ({ navigation }) => {
  const [deliveryOption, setDeliveryOption] = useState('asap');
  const [selectedTime, setSelectedTime] = useState(null);
  const [showTimes, setShowTimes] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const dispatch = useDispatch();

  const deliveryTimes = [
    '10:00 AM',
    '10:30 AM',
    '11:00 AM',
    '11:30 AM',
    '12:00 PM',
    '12:30 PM',
    '1:00 PM',
    '1:30 PM',
    '2:00 PM',
    '2:30 PM',
    '3:00 PM',
    '3:30 PM',
    '4:00 PM',
    '4:30 PM',
    '5:00 PM',
    '5:30 PM',
    '6:00 PM',
  ];

  const cartItems = useSelector(state => state.cart.items);
  const appliedPromo = useSelector(state => state.cart.appliedPromo);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const discount = appliedPromo ? subtotal * appliedPromo.discount : 0;

  const discountedSubtotal = subtotal - discount;

  const tax = discountedSubtotal * TAX_RATE;
  const total = discountedSubtotal + tax;

  const handlePlaceOrder = () => {
    if (deliveryOption === 'scheduled' && !selectedTime) {
      Alert.alert(
        'Select delivery time',
        'Please select a delivery time before placing your order.',
      );
      return;
    }

    const order = {
      id: Date.now().toString(),
      items: cartItems.map(item => ({ ...item })),
      createdAt: new Date().toISOString(),

      deliveryTime:
        deliveryOption === 'asap' ? 'As soon as possible' : selectedTime,

      paymentMethod,

      promoCode: appliedPromo?.code ?? null,

      subtotal,
      discount,
      tax,
      total,
    };

    dispatch(addOrder(order));
    dispatch(clearCart());

    Alert.alert('Order placed!', 'Your order has been placed successfully.', [
      {
        text: 'OK',
        onPress: () => {
          navigation.popToTop();
          navigation.navigate(SCREENS.HOME);
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons
            name="chevron-left"
            size={28}
            color={COLORS.textPrimary}
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Checkout</Text>

        <View style={styles.headerPlaceholder} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pick time:</Text>

        <TouchableOpacity
          style={styles.optionRow}
          onPress={() => {
            setDeliveryOption('asap');
            setSelectedTime(null);
            setShowTimes(false);
          }}
        >
          <View style={styles.radio}>
            {deliveryOption === 'asap' && <View style={styles.radioSelected} />}
          </View>

          <Text style={styles.optionText}>As soon as possible</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionRow}
          onPress={() => {
            setDeliveryOption('scheduled');
            setShowTimes(prev => !prev);
          }}
        >
          <View style={styles.radio}>
            {deliveryOption === 'scheduled' && (
              <View style={styles.radioSelected} />
            )}
          </View>

          <Text style={styles.optionText}>
            {selectedTime ? `Selected time: ${selectedTime}` : 'Select time'}
          </Text>

          <MaterialCommunityIcons
            name={showTimes ? 'chevron-up' : 'chevron-down'}
            size={20}
            color={COLORS.primaryBrown}
            style={styles.timeChevron}
          />
        </TouchableOpacity>

        {showTimes && (
          <View style={styles.timeDropdown}>
            {deliveryTimes.map(time => (
              <TouchableOpacity
                key={time}
                style={[
                  styles.timeOption,
                  selectedTime === time && styles.selectedTimeOption,
                ]}
                onPress={() => {
                  setSelectedTime(time);
                  setDeliveryOption('scheduled');
                  setShowTimes(false);
                }}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.timeOptionText,
                    selectedTime === time && styles.selectedTimeOptionText,
                  ]}
                >
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
      <View style={styles.divider} />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment method:</Text>

        {[
          { id: 'card', label: 'Card', icon: 'credit-card-outline' },
          { id: 'applePay', label: 'Apple Pay', icon: 'apple' },
          { id: 'googlePay', label: 'Google Pay', icon: 'google' },
          { id: 'cash', label: 'Cash', icon: 'cash' },
        ].map(method => (
          <TouchableOpacity
            key={method.id}
            style={styles.paymentRow}
            onPress={() => setPaymentMethod(method.id)}
            activeOpacity={0.7}
          >
            <View style={styles.radio}>
              {paymentMethod === method.id && (
                <View style={styles.radioSelected} />
              )}
            </View>

            <MaterialCommunityIcons
              name={method.icon}
              size={20}
              color={COLORS.primaryBrown}
            />

            <Text style={styles.optionText}>{method.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.divider} />

      <View style={styles.orderSection}>
        <Text style={styles.sectionTitle}>Order summary:</Text>

        <FlatList
          data={cartItems}
          keyExtractor={(item, index) => `${item.id}-${item.size}-${index}`}
          renderItem={({ item }) => (
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>
                {item.name} ({item.size})
              </Text>

              <Text style={styles.summaryValue}>
                ${(item.price * item.quantity).toFixed(2)}
              </Text>
            </View>
          )}
          style={styles.orderList}
          contentContainerStyle={styles.orderListContent}
          showsVerticalScrollIndicator={false}
        />

        <View style={styles.totals}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
          </View>

          {appliedPromo && (
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>
                Promo code ({appliedPromo.code})
              </Text>

              <Text style={styles.summaryValue}>-${discount.toFixed(2)}</Text>
            </View>
          )}

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Tax</Text>
            <Text style={styles.summaryValue}>${tax.toFixed(2)}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
          </View>
        </View>
      </View>

      <View style={styles.buttonWrapper}>
        <CustomButton title="Place order" onPress={handlePlaceOrder} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 24,
    paddingTop: 24,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },

  headerPlaceholder: {
    width: 28,
  },

  section: {
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 15,
  },

  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  radio: {
    width: 12,
    height: 12,
    borderWidth: 1,
    borderColor: COLORS.primaryBrown,
    borderRadius: 6,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  radioSelected: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.primaryBrown,
  },

  timeChevron: {
    marginLeft: 'auto',
  },

  timeDropdown: {
    position: 'absolute',
    top: 105,
    left: 0,
    right: 0,
    zIndex: 100,

    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,

    padding: 10,
    backgroundColor: COLORS.white,
    borderRadius: 8,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 10,
  },

  timeOption: {
    width: '31%',
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.primaryBrown,
    borderRadius: 6,
  },

  selectedTimeOption: {
    backgroundColor: COLORS.primaryBrown,
  },

  timeOptionText: {
    fontSize: 14,
    color: COLORS.primaryBrown,
  },

  selectedTimeOptionText: {
    color: COLORS.white,
    fontWeight: '600',
  },

  optionText: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },

  divider: {
    height: 1,
    backgroundColor: COLORS.lightBeige,
    marginTop: 10,
    marginBottom: 10,
  },

  paymentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },

  orderSection: {
    marginBottom: 10,
  },

  orderList: {
    maxHeight: 100,
    marginBottom: 6,
  },

  orderListContent: {
    gap: 2,
  },

  totals: {
    gap: 8,
  },

  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
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
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },

  totalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },

  buttonWrapper: {
    marginTop: 'auto',
    marginBottom: 24,
  },
});

export default CheckoutScreen;
