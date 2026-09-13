import { createDrawerNavigator } from '@react-navigation/drawer';
import MaterialCommunityIcons from '@react-native-vector-icons/material-design-icons/static';

import TabNavigator from './TabNavigator';
import SettingsScreen from '../screens/SettingsScreen';
import AboutScreen from '../screens/AboutScreen';
import ContactScreen from '../screens/ContactScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import { SCREENS } from '../constants/screens';
import { COLORS } from '../constants/colors';

const Drawer = createDrawerNavigator();

const HomeIcon = ({ color, size }) => (
  <MaterialCommunityIcons name="home-outline" size={size} color={color} />
);

const FavoritesIcon = ({ color, size }) => (
  <MaterialCommunityIcons name="heart-outline" size={size} color={color} />
);

const SettingsIcon = ({ color, size }) => (
  <MaterialCommunityIcons name="cog-outline" size={size} color={color} />
);

const AboutIcon = ({ color, size }) => (
  <MaterialCommunityIcons
    name="information-outline"
    size={size}
    color={color}
  />
);

const ContactIcon = ({ color, size }) => (
  <MaterialCommunityIcons name="email-outline" size={size} color={color} />
);

const DrawerNavigator = () => {
  return (
    // Drawer provides access to additional application screens
    // outside the main bottom tab navigation.
    <Drawer.Navigator
      backBehavior="history"
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.background,
        },

        headerTintColor: COLORS.textPrimary,
        headerTitleAlign: 'center',

        headerTitleStyle: {
          fontWeight: '600',
        },

        drawerActiveTintColor: COLORS.primaryBrown,
        drawerInactiveTintColor: COLORS.textSecondary,

        drawerStyle: {
          backgroundColor: COLORS.background,
        },
      }}
    >
      <Drawer.Screen
        name={SCREENS.HOME}
        component={TabNavigator}
        options={{
          title: 'Home',
          headerShown: false,
          drawerIcon: HomeIcon,
        }}
      />

      <Drawer.Screen
        name={SCREENS.FAVORITES}
        component={FavoritesScreen}
        options={{
          title: 'Favorites',
          drawerIcon: FavoritesIcon,
          headerShown: false,
        }}
      />

      <Drawer.Screen
        name={SCREENS.SETTINGS}
        component={SettingsScreen}
        options={{
          title: 'Settings',
          drawerIcon: SettingsIcon,
        }}
      />

      <Drawer.Screen
        name={SCREENS.ABOUT}
        component={AboutScreen}
        options={{
          title: 'About Us',
          drawerIcon: AboutIcon,
        }}
      />

      <Drawer.Screen
        name={SCREENS.CONTACT}
        component={ContactScreen}
        options={{
          title: 'Contact Us',
          drawerIcon: ContactIcon,
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
