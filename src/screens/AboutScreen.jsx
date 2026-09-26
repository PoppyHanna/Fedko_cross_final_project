import { ScrollView, StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from '@react-native-vector-icons/material-design-icons/static';

import { COLORS } from '../constants/colors';

const AboutScreen = () => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.hero}>
        <View style={styles.logo}>
          <MaterialCommunityIcons
            name="coffee-outline"
            size={46}
            color={COLORS.primaryBrown}
          />
        </View>

        <Text style={styles.title}>CoffeeToGo</Text>

        <Text style={styles.tagline}>
          Your favorite coffee, just a few taps away.
        </Text>
      </View>

      <View style={styles.aboutSection}>
        <Text style={styles.sectionTitle}>About Us</Text>

        <Text style={styles.description}>
          CoffeeToGo makes ordering your favorite coffee simple and convenient.
          Browse our menu, discover popular drinks, save your favorites and
          place an order whenever you need a coffee break.
        </Text>
      </View>

      <View style={styles.features}>
        <View style={styles.featureCard}>
          <MaterialCommunityIcons
            name="coffee"
            size={28}
            color={COLORS.primaryBrown}
          />

          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>Fresh Coffee</Text>
            <Text style={styles.featureText}>
              Explore a variety of hot, iced and cold drinks.
            </Text>
          </View>
        </View>

        <View style={styles.featureCard}>
          <MaterialCommunityIcons
            name="cellphone-check"
            size={28}
            color={COLORS.primaryBrown}
          />

          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>Easy Ordering</Text>
            <Text style={styles.featureText}>
              Customize your order and choose a convenient pickup time.
            </Text>
          </View>
        </View>

        <View style={styles.featureCard}>
          <MaterialCommunityIcons
            name="heart-outline"
            size={28}
            color={COLORS.primaryBrown}
          />

          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>Made with Care</Text>
            <Text style={styles.featureText}>
              Designed to make every coffee order simple and enjoyable.
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>CoffeeToGo</Text>
        <Text style={styles.version}>Version 1.0.0</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    padding: 24,
    paddingBottom: 40,
  },

  hero: {
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 32,
  },

  logo: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: COLORS.lightBeige,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },

  tagline: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 6,
    textAlign: 'center',
  },

  aboutSection: {
    marginBottom: 24,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 10,
  },

  description: {
    fontSize: 15,
    lineHeight: 23,
    color: COLORS.textSecondary,
  },

  features: {
    gap: 12,
  },

  featureCard: {
    backgroundColor: COLORS.lightBeige,
    borderRadius: 10,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },

  featureContent: {
    flex: 1,
    marginLeft: 14,
  },

  featureTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },

  featureText: {
    fontSize: 13,
    lineHeight: 19,
    color: COLORS.textSecondary,
    marginTop: 3,
  },

  footer: {
    alignItems: 'center',
    marginTop: 32,
  },

  footerText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primaryBrown,
  },

  version: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
});

export default AboutScreen;
