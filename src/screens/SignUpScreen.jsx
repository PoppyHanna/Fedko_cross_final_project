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
import { SCREENS } from '../constants/screens';
import { COLORS } from '../constants/colors';

const SignUpScreen = ({ navigation }) => {
  const { signUp } = useUser();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignUp = () => {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName || !trimmedEmail || !password || !confirmPassword) {
      Alert.alert('Missing information', 'Please fill in all fields.');
      return;
    }

    if (!trimmedEmail.includes('@')) {
      Alert.alert('Invalid email', 'Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      Alert.alert(
        'Password too short',
        'Password must contain at least 6 characters.',
      );
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match', 'Please check your passwords.');
      return;
    }

    signUp({
      name: trimmedName,
      email: trimmedEmail,
      password,
    });

    navigation.navigate(SCREENS.PROFILE);
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

        <Text style={styles.title}>Sign Up</Text>

        <View style={styles.headerPlaceholder} />
      </View>

      <Text style={styles.subtitle}>Create an account to continue.</Text>

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

        <Text style={styles.label}>Password</Text>

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            placeholderTextColor={COLORS.textSecondary}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
          />

          <TouchableOpacity
            onPress={() => setShowPassword(prev => !prev)}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              size={22}
              color={COLORS.textSecondary}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Confirm Password</Text>

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm your password"
            placeholderTextColor={COLORS.textSecondary}
            secureTextEntry={!showConfirmPassword}
            autoCapitalize="none"
          />

          <TouchableOpacity
            onPress={() => setShowConfirmPassword(prev => !prev)}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons
              name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
              size={22}
              color={COLORS.textSecondary}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.signUpButton}
          onPress={handleSignUp}
          activeOpacity={0.8}
        >
          <Text style={styles.signUpButtonText}>Create Account</Text>
        </TouchableOpacity>

        <View style={styles.loginRow}>
          <Text style={styles.loginText}>Already have an account?</Text>

          <TouchableOpacity
            onPress={() => navigation.navigate(SCREENS.LOGIN)}
            activeOpacity={0.7}
          >
            <Text style={styles.loginLink}>Log In</Text>
          </TouchableOpacity>
        </View>
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

  passwordContainer: {
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.primaryBrown,
    borderRadius: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  passwordInput: {
    flex: 1,
    color: COLORS.textPrimary,
    fontSize: 16,
  },

  signUpButton: {
    height: 52,
    backgroundColor: COLORS.primaryBrown,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },

  signUpButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.background,
  },

  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    marginTop: 20,
  },

  loginText: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },

  loginLink: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primaryBrown,
  },
});

export default SignUpScreen;
