import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';

import MaterialCommunityIcons from '@react-native-vector-icons/material-design-icons/static';

import { COLORS } from '../../constants/colors';
import { SHADOWS } from '../../constants/shadows';

const HorizontalProductCard = ({
  image,
  title,
  price,
  onPress,
  isFavorite,
  onFavoritePress,
}) => {
  const { width } = useWindowDimensions();

  // Use a slightly wider image on larger screens.
  const isLandscape = width > 600;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <Image
        source={image}
        style={[
          styles.image,
          isLandscape ? styles.imageLandscape : styles.imagePortrait,
        ]}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
            {title}
          </Text>

          <TouchableOpacity onPress={onFavoritePress} activeOpacity={0.7}>
            <MaterialCommunityIcons
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={18}
              color={COLORS.primaryBrown}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.priceRow}>
          <Text style={styles.price}>${price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: COLORS.lightBeige,
    borderRadius: 14,
    overflow: 'hidden',
    ...SHADOWS.default,
  },

  image: {
    height: 133,
  },

  imagePortrait: {
    width: 145,
  },

  imageLandscape: {
    width: 180,
  },

  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    justifyContent: 'space-between',
  },

  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 8,
  },

  title: {
    flex: 1,
    maxWidth: '82%',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 20,
    color: COLORS.textTertiary,
  },

  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  price: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textTertiary,
  },
});

export default HorizontalProductCard;
