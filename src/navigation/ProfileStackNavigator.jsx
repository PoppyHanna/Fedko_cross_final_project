import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProfileScreen from '../screens/ProfileScreen';
import OrderHistoryScreen from '../screens/OrderHistoryScreen';

import SignUpScreen from '../screens/SignUpScreen';
import LoginScreen from '../screens/LoginScreen';
import ProfileSettingsScreen from '../screens/ProfileSettingsScreen';

import { SCREENS } from '../constants/screens';

const Stack = createNativeStackNavigator();

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={SCREENS.PROFILE} component={ProfileScreen} />

      <Stack.Screen name={SCREENS.LOGIN} component={LoginScreen} />

      <Stack.Screen name={SCREENS.SIGN_UP} component={SignUpScreen} />

      <Stack.Screen
        name={SCREENS.PROFILE_SETTINGS}
        component={ProfileSettingsScreen}
      />

      <Stack.Screen
        name={SCREENS.ORDER_HISTORY}
        component={OrderHistoryScreen}
      />
    </Stack.Navigator>
  );
};

export default ProfileStackNavigator;
