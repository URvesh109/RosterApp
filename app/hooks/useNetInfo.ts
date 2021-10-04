import {useState, useEffect} from 'react';
import NetInfo, {NetInfoState} from '@react-native-community/netinfo';

export function useNetInfo() {
  const [isOnline, setIsOnline] = useState<boolean | null>(true);
  useEffect(() => {
    function handleStatusChange(state: NetInfoState) {
      setIsOnline(state.isConnected);
    }
    const unsubscribe = NetInfo.addEventListener(handleStatusChange);
    return () => {
      unsubscribe();
    };
  });
  return isOnline;
}
