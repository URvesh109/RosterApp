import React from 'react';
import {View, Text} from 'react-native';
import {COMMON_STYLES} from '../../theme';

export const NoInternet = () => {
  return (
    <View style={COMMON_STYLES.container}>
      <Text style={COMMON_STYLES.label}>No Internet Connection</Text>
    </View>
  );
};
