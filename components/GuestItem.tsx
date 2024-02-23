import { router } from 'expo-router';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import { colors } from '../styles/constants';
import { Guest } from '../types/Guest';

const styles = StyleSheet.create({
  right: {
    textAlign: 'right',
    fontSize: 10,
  },
  center: {
    textAlign: 'center',
  },
  card: {
    backgroundColor: colors.cardBackground,
    paddingTop: 10,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: 30,
    marginBottom: 30,
    borderColor: colors.cardShadow,
    borderWidth: 0.5,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderTopRightRadius: 30,
    textAlign: 'left',
  },
});

type Props = {
  guest: Guest;
};

export default function GuestItem({ guest }: Props) {
  const { id, firstName, lastName, attending } = guest;

  const openGuest = () => {
    router.push({
      pathname: '/guests/[id]',
      params: { id },
    });
  };
  return (
    <TouchableOpacity onPress={openGuest} style={styles.card}>
      <Text style={styles.center}>
        {firstName} {lastName}
      </Text>
      <Text style={styles.right}>{attending ? 'Coming!' : 'Not Coming'}</Text>
    </TouchableOpacity>
  );
}
