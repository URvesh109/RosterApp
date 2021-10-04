import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {COMMON_STYLES} from '../../theme';

export const LoadingIndicator = () => {
  return (
    <View style={COMMON_STYLES.container}>
      <ActivityIndicator />
    </View>
  );
};
