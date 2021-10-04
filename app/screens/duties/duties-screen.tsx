import React, {FC} from 'react';
import {View, Text, ViewStyle, TextStyle, FlatList} from 'react-native';
import {COLORS, SPACING, COMMON_STYLES} from '../../theme';
import {LoadingIndicator, NoInternet, EmptyList} from '../../components';
import {useNetInfo} from '../../hooks';

export const DutiesScreen = () => {
  const loading = false;
  const isOnline = useNetInfo();
  if (!isOnline) {
    return <NoInternet />;
  } else if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <View style={COMMON_STYLES.full}>
      <Text style-={COMMON_STYLES.label}>Duties Screen</Text>
    </View>
  );
};
