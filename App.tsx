/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, ViewStyle} from 'react-native';
import RNAsyncStorageFlipper from 'rn-async-storage-flipper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppNavigator} from './app/navigator';

RNAsyncStorageFlipper(AsyncStorage);

const FULL: ViewStyle = {
  flex: 1,
};

const App = () => {
  return (
    <SafeAreaView style={FULL}>
      <AppNavigator />
    </SafeAreaView>
  );
};

export default App;
