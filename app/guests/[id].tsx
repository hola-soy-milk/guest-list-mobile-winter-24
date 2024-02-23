import {
  useEffect,
  useState,
} from 'react';

import { useLocalSearchParams } from 'expo-router';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { colors } from '../../styles/constants';
import { Guest } from '../../types/Guest';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  text: {
    color: colors.text,
  },
});

const apiUrl =
  'https://45063d72-10f4-4077-a954-686bc0c70988-00-6op9g06fsf0t.janeway.replit.dev';

export default function Guests() {
  const { id } = useLocalSearchParams();

  const [guest, setGuest] = useState<Guest>();

  useEffect(() => {
    async function loadGuest() {
      try {
        if (typeof id !== 'string') {
          return;
        }
        const response = await fetch(`${apiUrl}/guests/${id}`);
        const fetchedGuest = await response.json();
        setGuest(fetchedGuest);
      } catch (error) {
        console.error('Error fetching guest', error);
      }
    }
    loadGuest().catch(console.error);
  }, [id]);

  if (!guest) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {guest.firstName} {guest.lastName}
      </Text>
      <Text style={styles.text}>
        {guest.attending ? 'Attending' : 'Not attending'}
      </Text>
    </View>
  );
}
