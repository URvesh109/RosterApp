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
    color: COLORS.darkGrey,
  },
  row: {
    flexDirection: 'row',
  },
  card: {
    marginBottom: 15,
    borderRadius: SPACING.large,
    backgroundColor: COLORS.grey,
    padding: SPACING.xl,
    shadowColor: COLORS.darkGrey,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    justifyContent: 'space-between',
    elevation: 4,
  },
});
