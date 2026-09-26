import { StyleSheet, TextInput, View } from 'react-native';

import MaterialCommunityIcons from '@react-native-vector-icons/material-design-icons/static';

import { COLORS } from '../../constants/colors';
import { SHADOWS } from '../../constants/shadows';

const SearchInput = ({
  value,
  onChangeText,
  placeholder = 'Search for coffee...',
}) => {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name="magnify"
        size={18}
        color={COLORS.textSecondary}
      />

      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={COLORS.textSecondary}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    marginBottom: 24,
    backgroundColor: COLORS.white,
    borderRadius: 14,
    ...SHADOWS.default,
  },

  input: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 0,

    color: COLORS.textTertiary,
    fontSize: 12,
    fontWeight: '400',

    textAlignVertical: 'center',
  },
});

export default SearchInput;
