import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from '@react-native-vector-icons/material-design-icons/static';

import { useUser } from '../context/UserContext';
import { SCREENS } from '../constants/screens';
import { COLORS } from '../constants/colors';

const ProfileScreen = ({ navigation }) => {
  const { user, updateUser } = useUser();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const handleSave = () => {
    updateUser({
      name,
      email,
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.subtitle}>User profile information</Text>

      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <MaterialCommunityIcons
            name="account"
            size={56}
            color={COLORS.primaryBrown}
          />
        </View>

        <Text style={styles.userName}>{user.name}</Text>

        {user.email ? <Text style={styles.userEmail}>{user.email}</Text> : null}
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Name</Text>

        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
          placeholderTextColor={COLORS.textSecondary}
        />

        <Text style={styles.label}>Email</Text>

        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          placeholderTextColor={COLORS.textSecondary}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleSave}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Save changes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.favoritesButton}
          onPress={() => navigation.navigate(SCREENS.FAVORITES)}
          activeOpacity={0.8}
        >
          <View style={styles.favoritesContent}>
            <MaterialCommunityIcons
              name="heart-outline"
              size={22}
              color={COLORS.primaryBrown}
            />

            <Text style={styles.favoritesText}>My Favorites</Text>
          </View>

          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color={COLORS.textSecondary}
          />
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

  avatarContainer: {
    alignItems: 'center',
    marginTop: 32,
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

  form: {
    marginTop: 32,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.primaryBrown,
    borderRadius: 10,
    paddingHorizontal: 16,
    color: COLORS.textPrimary,
    fontSize: 16,
    marginBottom: 20,
  },

  button: {
    height: 52,
    borderRadius: 10,
    backgroundColor: COLORS.primaryBrown,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.background,
  },

  favoritesButton: {
    minHeight: 54,
    marginTop: 20,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: COLORS.primaryBrown,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  favoritesContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  favoritesText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
});

export default ProfileScreen;
