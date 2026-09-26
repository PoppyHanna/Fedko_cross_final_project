import { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from '@react-native-vector-icons/material-design-icons/static';

import { useUser } from '../context/UserContext';
import { COLORS } from '../constants/colors';

const ProfileSettingsScreen = ({ navigation }) => {
  const { user, updateUser } = useUser();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const handleSave = () => {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName || !trimmedEmail) {
      Alert.alert('Missing information', 'Please enter your name and email.');
      return;
    }

    if (!trimmedEmail.includes('@')) {
      Alert.alert('Invalid email', 'Please enter a valid email address.');
      return;
    }

    updateUser({
      name: trimmedName,
      email: trimmedEmail,
    });

    Alert.alert(
      'Profile updated',
      'Your changes have been saved successfully.',
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ],
    );
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

        <Text style={styles.title}>Profile Settings</Text>

        <View style={styles.headerPlaceholder} />
      </View>

      <Text style={styles.subtitle}>Update your personal information.</Text>

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
          style={styles.saveButton}
          onPress={handleSave}
          activeOpacity={0.8}
        >
          <Text style={styles.saveButtonText}>Save Changes</Text>
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
    paddingTop: 16,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  title: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },

  headerPlaceholder: {
    width: 28,
  },

  subtitle: {
    fontSize: 15,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 12,
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

  saveButton: {
    height: 52,
    backgroundColor: COLORS.primaryBrown,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },

  saveButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.background,
  },
});

export default ProfileSettingsScreen;
