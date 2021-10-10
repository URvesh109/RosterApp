import {StyleSheet} from 'react-native';
import {COLORS, FONT_SIZE, SPACING} from './constants';

export const COMMON_STYLES = StyleSheet.create({
  full: {
    flex: 1,
    padding: SPACING.large,
    backgroundColor: COLORS.lightWhite,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: FONT_SIZE.xl,
    // lineHeight: 15,
    color: COLORS.darkGrey,
  },
  row: {
    flexDirection: 'row',
  },
  card: {
    marginTop: 10,
    width: '100%',
    borderRadius: SPACING.large,
    backgroundColor: COLORS.grey,
    padding: SPACING.large,
    shadowColor: COLORS.grey,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 8,
    justifyContent: 'space-between',
  },
});
