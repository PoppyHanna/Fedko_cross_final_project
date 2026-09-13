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

const VerticalProductCard = ({
  image,
  title,
  price,
  onPress,
  isFavorite,
  onFavoritePress,
}) => {
  const { width } = useWindowDimensions();

  // Adjust image height for portrait and landscape screen orientations.
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
          <Text style={styles.title} numberOfLines={2}>
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
          <Text style={styles.price}>{price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    // Keeps two equal cards in one row with space between them.
    width: '47%',
    backgroundColor: COLORS.lightBeige,
    borderRadius: 14,
    overflow: 'hidden',
    ...SHADOWS.default,
  },

  image: {
    width: '100%',
  },

  imagePortrait: {
    height: 155,
  },

  imageLandscape: {
    height: 133,
  },

  content: {
    height: 100,
    paddingHorizontal: 10,
    paddingVertical: 10,
    paddingBottom: 8,
    justifyContent: 'space-between',
  },

  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 6,
  },

  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 16,
    color: COLORS.textTertiary,
  },

  price: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textTertiary,
  },
});

export default VerticalProductCard;
