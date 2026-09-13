import { useSelector } from 'react-redux';
import {
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

import { COLORS } from '../constants/colors';

const CheckoutScreen = ({ navigation }) => {
  const cartItems = useSelector(state => state.cart.items);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

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

        <TouchableOpacity style={styles.optionRow}>
          <View style={styles.radio} />
          <Text style={styles.optionText}>As soon as possible</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionRow}>
          <View style={styles.radio} />
          <Text style={styles.optionText}>Select time</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment method:</Text>

        <TouchableOpacity style={styles.optionRow}>
          <View style={styles.radio} />
          <Text style={styles.optionText}>Card</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionRow}>
          <View style={styles.radio} />
          <Text style={styles.optionText}>Apple Pay</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionRow}>
          <View style={styles.radio} />
          <Text style={styles.optionText}>Google Pay</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionRow}>
          <View style={styles.radio} />
          <Text style={styles.optionText}>Cash</Text>
        </TouchableOpacity>
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
        <CustomButton
          title="Place order"
          onPress={() => {
            console.log('Order placed');
          }}
        />
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
  },

  optionText: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },

  divider: {
    height: 1,
    backgroundColor: COLORS.lightBeige,
    marginTop: 10,
    marginBottom: 20,
  },

  orderSection: {
    marginBottom: 16,
  },

  orderList: {
    maxHeight: 100,
    marginBottom: 10,
  },

  orderListContent: {
    gap: 3,
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
