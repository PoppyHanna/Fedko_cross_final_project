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

const LoginScreen = ({ navigation }) => {
  const { logIn } = useUser();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    const trimmedEmail = email.trim();

    if (!trimmedEmail || !password) {
      Alert.alert(
        'Missing information',
        'Please enter your email and password.',
      );
      return;
    }

    const success = logIn(trimmedEmail, password);

    if (!success) {
      Alert.alert('Login failed', 'Incorrect email or password.');
      return;
    }

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

        <Text style={styles.title}>Log In</Text>

        <View style={styles.headerPlaceholder} />
      </View>

      <Text style={styles.subtitle}>Welcome back! Log in to your account.</Text>

      <View style={styles.form}>
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

        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
          activeOpacity={0.8}
        >
          <Text style={styles.loginButtonText}>Log In</Text>
        </TouchableOpacity>

        <View style={styles.signUpRow}>
          <Text style={styles.signUpText}>Don't have an account?</Text>

          <TouchableOpacity
            onPress={() => navigation.navigate(SCREENS.SIGN_UP)}
            activeOpacity={0.7}
          >
            <Text style={styles.signUpLink}>Sign Up</Text>
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

  loginButton: {
    height: 52,
    backgroundColor: COLORS.primaryBrown,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },

  loginButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.background,
  },

  signUpRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    marginTop: 20,
  },

  signUpText: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },

  signUpLink: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primaryBrown,
  },
});

export default LoginScreen;
