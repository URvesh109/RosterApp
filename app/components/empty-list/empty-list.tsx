import React, {FC} from 'react';
import {View, Text, ViewStyle, Dimensions} from 'react-native';
import {COMMON_STYLES} from '../../theme';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const CONTAINER: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  height: windowHeight / 2,
  width: windowWidth,
};

export type Props = {
  message?: string;
};

export const EmptyList: FC<Props> = ({message = 'No item found'}) => {
  return (
    <View style={CONTAINER}>
      <Text style={COMMON_STYLES.label}>{message}</Text>
    </View>
  );
};
