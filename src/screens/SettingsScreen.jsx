import { useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import MaterialCommunityIcons from '@react-native-vector-icons/material-design-icons/static';

import { COLORS } from '../constants/colors';

const SettingsScreen = () => {
  const [orderNotifications, setOrderNotifications] = useState(true);
  const [promoNotifications, setPromoNotifications] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Manage your app preferences.</Text>

      <Text style={styles.sectionTitle}>Notifications</Text>

      <View style={styles.card}>
        <View style={styles.settingInfo}>
          <MaterialCommunityIcons
            name="bell-outline"
            size={22}
            color={COLORS.primaryBrown}
          />

          <View style={styles.textContainer}>
            <Text style={styles.settingTitle}>Order notifications</Text>

            <Text style={styles.settingDescription}>
              Receive updates about your orders.
            </Text>
          </View>
        </View>

        <Switch
          value={orderNotifications}
          onValueChange={setOrderNotifications}
          trackColor={{
            false: COLORS.border,
            true: COLORS.lightBeige,
          }}
          thumbColor={
            orderNotifications ? COLORS.primaryBrown : COLORS.textSecondary
          }
        />
      </View>

      <View style={styles.card}>
        <View style={styles.settingInfo}>
          <MaterialCommunityIcons
            name="tag-outline"
            size={22}
            color={COLORS.primaryBrown}
          />

          <View style={styles.textContainer}>
            <Text style={styles.settingTitle}>Promotions & offers</Text>

            <Text style={styles.settingDescription}>
              Receive coffee deals and special offers.
            </Text>
          </View>
        </View>

        <Switch
          value={promoNotifications}
          onValueChange={setPromoNotifications}
          trackColor={{
            false: COLORS.border,
            true: COLORS.lightBeige,
          }}
          thumbColor={
            promoNotifications ? COLORS.primaryBrown : COLORS.textSecondary
          }
        />
      </View>

      <Text style={styles.sectionTitle}>App preferences</Text>

      <View style={styles.card}>
        <View style={styles.settingInfo}>
          <MaterialCommunityIcons
            name="translate"
            size={22}
            color={COLORS.primaryBrown}
          />

          <View style={styles.textContainer}>
            <Text style={styles.settingTitle}>Language</Text>

            <Text style={styles.settingDescription}>Application language</Text>
          </View>
        </View>

        <Text style={styles.value}>English</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 24,
  },

  subtitle: {
    fontSize: 15,
    color: COLORS.textSecondary,
    marginTop: 8,
    marginBottom: 28,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textSecondary,
    marginBottom: 10,
    marginTop: 8,
  },

  card: {
    minHeight: 72,
    backgroundColor: COLORS.lightBeige,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  settingInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },

  textContainer: {
    flex: 1,
    marginLeft: 12,
  },

  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },

  settingDescription: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 3,
  },

  value: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primaryBrown,
  },
});

export default SettingsScreen;
