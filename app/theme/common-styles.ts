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
    fontSize: FONT_SIZE.large,
    lineHeight: 15,
    marginTop: SPACING.verySmall,
    color: COLORS.darkGrey,
  },
  row: {
    flexDirection: 'row',
  },
});
