import {
  Slot,
  usePathname,
} from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  View,
} from 'react-native';

import {
  Pacifico_400Regular,
  useFonts,
} from '@expo-google-fonts/pacifico';

import Header from '../components/Header';
import { colors } from '../styles/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingBottom: 40,
  },
  slot: {
    flex: 1,
    paddingLeft: 30,
    paddingRight: 30,
  },
});

const routeMapping = {
  '/': 'Guest List',
  '/new-guest': 'New Guest',
};

export default function HomeLayout() {
  const pathname = usePathname();
  console.log(pathname);
  let label = routeMapping[pathname as keyof typeof routeMapping];
  if (!label) {
    const guestPattern = /guests\/\d/;
    if (pathname.match(guestPattern)) {
      label = 'Guest';
    }
  }

  const [fontsLoaded] = useFonts({
    Pacifico_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Header label={label} />
      <StatusBar style="auto" />
      <View style={styles.slot}>
        <Slot />
      </View>
    </View>
  );
}
