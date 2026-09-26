import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from '@react-native-vector-icons/material-design-icons/static';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import HomeStackNavigator from './HomeStackNavigator';
import MenuStackNavigator from './MenuStackNavigator';
import CartStackNavigator from './CartStackNavigator';

import ProfileStackNavigator from './ProfileStackNavigator';

import { SCREENS } from '../constants/screens';
import { COLORS } from '../constants/colors';
import { SHADOWS } from '../constants/shadows';

const Tab = createBottomTabNavigator();

const HomeIcon = ({ color }) => (
  <MaterialCommunityIcons name="storefront" size={22} color={color} />
);

const MenuIcon = ({ color }) => (
  <MaterialCommunityIcons name="view-grid" size={22} color={color} />
);

const CartIcon = ({ color }) => (
  <MaterialCommunityIcons name="cart" size={22} color={color} />
);

const ProfileIcon = ({ color }) => (
  <MaterialCommunityIcons name="account" size={22} color={color} />
);

const TabNavigator = () => {
  const insets = useSafeAreaInsets();

  return (
    // Each main tab contains its own navigation flow.
    // Nested stacks keep the bottom TabBar visible on detail screens.
    <Tab.Navigator
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: COLORS.primaryBrown,
        tabBarInactiveTintColor: COLORS.textSecondary,

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '400',
        },

        tabBarStyle: {
          height: 64 + insets.bottom,
          backgroundColor: COLORS.lightBeige,
          borderTopWidth: 0,
          borderTopLeftRadius: 14,
          borderTopRightRadius: 14,
          paddingHorizontal: 8,
          paddingTop: 8,
          paddingBottom: Math.max(insets.bottom, 8),
          ...SHADOWS.default,
        },

        tabBarItemStyle: {
          paddingVertical: 2,
        },
      }}
    >
      <Tab.Screen
        name={SCREENS.HOME}
        component={HomeStackNavigator}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: HomeIcon,
        }}
      />

      <Tab.Screen
        name={SCREENS.MENU}
        component={MenuStackNavigator}
        options={{
          tabBarLabel: 'Menu',
          tabBarIcon: MenuIcon,
        }}
      />

      <Tab.Screen
        name={SCREENS.CART}
        component={CartStackNavigator}
        options={{
          tabBarLabel: 'Cart',
          tabBarIcon: CartIcon,
        }}
      />

      <Tab.Screen
        name={SCREENS.PROFILE}
        component={ProfileStackNavigator}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ProfileIcon,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
