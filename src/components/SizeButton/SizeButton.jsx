import { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { COLORS } from '../../constants/colors';
import { SHADOWS } from '../../constants/shadows';

const SizeButton = ({ title, isActive = false, onPress }) => {
  const scale = useSharedValue(isActive ? 1.05 : 1);

  useEffect(() => {
    scale.value = withSpring(isActive ? 1.05 : 1);
  }, [isActive, scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={[styles.wrapper, animatedStyle]}>
      <TouchableOpacity
        style={[
          styles.button,
          isActive ? styles.activeButton : styles.inactiveButton,
        ]}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <Text
          style={[
            styles.text,
            isActive ? styles.activeText : styles.inactiveText,
          ]}
        >
          {title}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },

  button: {
    height: 40,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },

  activeButton: {
    backgroundColor: COLORS.brown,
    ...SHADOWS.default,
  },

  inactiveButton: {
    backgroundColor: COLORS.primaryBrown,
  },

  text: {
    fontSize: 14,
    fontWeight: '600',
  },

  activeText: {
    color: COLORS.white,
  },

  inactiveText: {
    color: COLORS.background,
  },
});

export default SizeButton;
