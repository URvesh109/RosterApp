/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import {SafeAreaView, ViewStyle} from 'react-native';
import RNAsyncStorageFlipper from 'rn-async-storage-flipper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppNavigator} from './navigator';
import {RootStore, RootStoreProvider, setupRootStore} from './models';

RNAsyncStorageFlipper(AsyncStorage);

const FULL: ViewStyle = {
  flex: 1,
};

const App = () => {
  const [rootStore, setRootStore] = useState<RootStore | undefined>(undefined);

  useEffect(() => {
    (async () => {
      setupRootStore().then(setRootStore);
    })();
  }, []);
  if (!rootStore) {
    return null;
  }

  return (
    <RootStoreProvider value={rootStore}>
      <SafeAreaView style={FULL}>
        <AppNavigator />
      </SafeAreaView>
    </RootStoreProvider>
  );
};

export default App;
