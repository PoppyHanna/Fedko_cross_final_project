import { useSelector } from 'react-redux';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from '@react-native-vector-icons/material-design-icons/static';

import { COLORS } from '../constants/colors';

const OrderHistoryScreen = ({ navigation }) => {
  const orders = useSelector(state => state.orders.items);

  const paymentLabels = {
    card: 'Card',
    applePay: 'Apple Pay',
    googlePay: 'Google Pay',
    cash: 'Cash',
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

        <Text style={styles.headerTitle}>My Orders</Text>

        <View style={styles.headerPlaceholder} />
      </View>

      {orders.length === 0 ? (
        <View style={styles.emptyContainer}>
          <MaterialCommunityIcons
            name="receipt-text-outline"
            size={48}
            color={COLORS.primaryBrown}
          />

          <Text style={styles.emptyTitle}>No orders yet</Text>

          <Text style={styles.emptyText}>
            Your completed orders will appear here.
          </Text>
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={styles.orderCard}>
              <View style={styles.orderHeader}>
                <Text style={styles.orderNumber}>
                  Order #{item.id.slice(-6)}
                </Text>

                <Text style={styles.date}>
                  {new Date(item.createdAt).toLocaleDateString()}
                </Text>
              </View>

              <View style={styles.divider} />

              {item.items.map((product, index) => (
                <View
                  key={`${product.id}-${product.size}-${index}`}
                  style={styles.productRow}
                >
                  <Text style={styles.productName}>
                    {product.name} × {product.quantity}
                  </Text>

                  <Text style={styles.productPrice}>
                    ${(product.price * product.quantity).toFixed(2)}
                  </Text>
                </View>
              ))}

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Delivery:</Text>
                <Text style={styles.infoValue}>{item.deliveryTime}</Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Payment:</Text>
                <Text style={styles.infoValue}>
                  {paymentLabels[item.paymentMethod] ?? item.paymentMethod}
                </Text>
              </View>

              {item.promoCode && (
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Promo:</Text>
                  <Text style={styles.infoValue}>{item.promoCode}</Text>
                </View>
              )}

              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>${item.total.toFixed(2)}</Text>
              </View>
            </View>
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
    paddingHorizontal: 24,
    paddingTop: 16,
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

  list: {
    gap: 16,
    paddingBottom: 24,
  },

  orderCard: {
    backgroundColor: COLORS.lightBeige,
    borderRadius: 10,
    padding: 16,
  },

  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  orderNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },

  date: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },

  divider: {
    height: 1,
    backgroundColor: COLORS.background,
    marginVertical: 12,
  },

  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },

  productName: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textPrimary,
  },

  productPrice: {
    fontSize: 14,
    color: COLORS.textPrimary,
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },

  infoLabel: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },

  infoValue: {
    fontSize: 13,
    color: COLORS.textPrimary,
  },

  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.background,
  },

  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },

  totalValue: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primaryBrown,
  },

  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 80,
  },

  emptyTitle: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },

  emptyText: {
    marginTop: 8,
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});

export default OrderHistoryScreen;
