import {
  Alert,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialCommunityIcons from '@react-native-vector-icons/material-design-icons/static';

import { COLORS } from '../constants/colors';

const ContactScreen = () => {
  const openLink = async url => {
    try {
      await Linking.openURL(url);
    } catch {
      Alert.alert('Unable to open link');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>
        Have a question? We'd love to hear from you.
      </Text>

      <TouchableOpacity
        style={styles.card}
        onPress={() => openLink('mailto:coffeetogo@google.com')}
        activeOpacity={0.8}
      >
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name="email-outline"
            size={24}
            color={COLORS.primaryBrown}
          />
        </View>

        <View>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.text}>coffeetogo@google.com</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => openLink('tel:+19173710492')}
        activeOpacity={0.8}
      >
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name="phone-outline"
            size={24}
            color={COLORS.primaryBrown}
          />
        </View>

        <View>
          <Text style={styles.label}>Phone</Text>
          <Text style={styles.text}>+1 917 371 0492</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.card}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name="map-marker-outline"
            size={24}
            color={COLORS.primaryBrown}
          />
        </View>

        <View>
          <Text style={styles.label}>Location</Text>
          <Text style={styles.text}>New Jersey, USA</Text>
        </View>
      </View>

      <Text style={styles.socialTitle}>Follow us</Text>

      <View style={styles.socialContainer}>
        <TouchableOpacity
          style={styles.socialButton}
          onPress={() => openLink('https://www.instagram.com/')}
          activeOpacity={0.8}
        >
          <MaterialCommunityIcons
            name="instagram"
            size={28}
            color={COLORS.primaryBrown}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.socialButton}
          onPress={() => openLink('https://www.facebook.com/')}
          activeOpacity={0.8}
        >
          <MaterialCommunityIcons
            name="facebook"
            size={28}
            color={COLORS.primaryBrown}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.socialButton}
          onPress={() => openLink('https://x.com/')}
          activeOpacity={0.8}
        >
          <MaterialCommunityIcons
            name="twitter"
            size={28}
            color={COLORS.primaryBrown}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.socialButton}
          onPress={() => openLink('https://t.me/telegram')}
          activeOpacity={0.8}
        >
          <MaterialCommunityIcons
            name="send"
            size={28}
            color={COLORS.primaryBrown}
            style={styles.telegramIcon}
          />
        </TouchableOpacity>
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

  card: {
    minHeight: 72,
    backgroundColor: COLORS.lightBeige,
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },

  label: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 3,
  },

  text: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },

  socialTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 16,
  },

  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },

  socialButton: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: COLORS.lightBeige,
    alignItems: 'center',
    justifyContent: 'center',
  },

  telegramIcon: {
    transform: [{ rotate: '-40deg' }],
  },
});

export default ContactScreen;
