import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from '@react-native-vector-icons/material-design-icons/static';

import { useUser } from '../context/UserContext';
import { SCREENS } from '../constants/screens';
import { COLORS } from '../constants/colors';

const ProfileScreen = ({ navigation }) => {
  const { user, isLoggedIn, logOut } = useUser();

  if (!isLoggedIn) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.subtitle}>
          Log in or create an account to continue.
        </Text>

        <View style={styles.guestContainer}>
          <View style={styles.avatar}>
            <MaterialCommunityIcons
              name="account-outline"
              size={56}
              color={COLORS.primaryBrown}
            />
          </View>

          <Text style={styles.welcomeTitle}>Welcome!</Text>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate(SCREENS.LOGIN)}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>Log In</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.navigate(SCREENS.SIGN_UP)}
            activeOpacity={0.8}
          >
            <Text style={styles.secondaryButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Text style={styles.title}>Profile</Text>

      <View style={styles.profileContainer}>
        <View style={styles.avatar}>
          <MaterialCommunityIcons
            name="account"
            size={56}
            color={COLORS.primaryBrown}
          />
        </View>

        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userEmail}>{user.email}</Text>
      </View>

      <View style={styles.menu}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate(SCREENS.PROFILE_SETTINGS)}
          activeOpacity={0.8}
        >
          <View style={styles.menuContent}>
            <MaterialCommunityIcons
              name="account-cog-outline"
              size={22}
              color={COLORS.primaryBrown}
            />
            <Text style={styles.menuText}>Profile Settings</Text>
          </View>

          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color={COLORS.textSecondary}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate(SCREENS.FAVORITES)}
          activeOpacity={0.8}
        >
          <View style={styles.menuContent}>
            <MaterialCommunityIcons
              name="heart-outline"
              size={22}
              color={COLORS.primaryBrown}
            />
            <Text style={styles.menuText}>My Favorites</Text>
          </View>

          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color={COLORS.textSecondary}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate(SCREENS.ORDER_HISTORY)}
          activeOpacity={0.8}
        >
          <View style={styles.menuContent}>
            <MaterialCommunityIcons
              name="receipt-text-outline"
              size={22}
              color={COLORS.primaryBrown}
            />
            <Text style={styles.menuText}>My Orders</Text>
          </View>

          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color={COLORS.textSecondary}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={logOut}
          activeOpacity={0.8}
        >
          <MaterialCommunityIcons
            name="logout"
            size={20}
            color={COLORS.primaryBrown}
          />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
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

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },

  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginTop: 8,
  },

  guestContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 80,
  },

  profileContainer: {
    alignItems: 'center',
    marginTop: 40,
  },

  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 2,
    borderColor: COLORS.primaryBrown,
    alignItems: 'center',
    justifyContent: 'center',
  },

  welcomeTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginTop: 20,
    marginBottom: 32,
  },

  userName: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginTop: 16,
  },

  userEmail: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },

  primaryButton: {
    width: '100%',
    height: 52,
    borderRadius: 10,
    backgroundColor: COLORS.primaryBrown,
    alignItems: 'center',
    justifyContent: 'center',
  },

  primaryButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.background,
  },

  secondaryButton: {
    width: '100%',
    height: 52,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.primaryBrown,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },

  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primaryBrown,
  },

  menu: {
    marginTop: 32,
  },

  menuItem: {
    minHeight: 54,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: COLORS.primaryBrown,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  menuContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  menuText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },

  logoutButton: {
    height: 52,
    marginTop: 12,
    borderRadius: 10,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.primaryBrown,
  },

  logoutText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primaryBrown,
  },
});

export default ProfileScreen;
