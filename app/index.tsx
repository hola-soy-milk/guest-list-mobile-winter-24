import {
  useEffect,
  useState,
} from 'react';

import {
  Link,
  useLocalSearchParams,
} from 'expo-router';
import {
  FlatList,
  StyleSheet,
} from 'react-native';

import GuestItem from '../components/GuestItem';
import { colors } from '../styles/constants';
import { Guest } from '../types/Guest';

const styles = StyleSheet.create({
  list: {
    marginTop: 30,
    paddingLeft: 30,
    paddingRight: 30,
    width: '100%',
  },
  button: {
    marginTop: 30,
    paddingTop: 10,
    paddingBottom: 10,
    width: '100%',
    textAlign: 'center',
    backgroundColor: colors.cardBackground,
    fontSize: 24,
  },
});

const renderItem = (item: { item: Guest }) => <GuestItem guest={item.item} />;
const apiUrl =
  'https://45063d72-10f4-4077-a954-686bc0c70988-00-6op9g06fsf0t.janeway.replit.dev';

export default function Index() {
  const { firstName, lastName } = useLocalSearchParams<{
    firstName?: Guest['firstName'];
    lastName?: Guest['lastName'];
  }>();
  const [guests, setGuests] = useState<Guest[]>([]);

  useEffect(() => {
    async function loadGuests() {
      const response = await fetch(`${apiUrl}/guests`);
      const fetchedGuests: Guest[] = await response.json();
      setGuests(fetchedGuests);
    }
    async function postGuest(guest: { firstName: string; lastName: string }) {
      const response = await fetch(`${apiUrl}/guests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: guest.firstName,
          lastName: guest.lastName,
        }),
      });
      const newGuest: Guest = await response.json();
      setGuests((g) => [...g, newGuest]);
    }
    loadGuests().catch(console.error);
    if (typeof firstName === 'string' && typeof lastName === 'string') {
      postGuest({ firstName, lastName }).catch(console.error);
    }
  }, [firstName, lastName]);

  return (
    <>
      <FlatList
        style={styles.list}
        data={guests}
        renderItem={renderItem}
        keyExtractor={(item: Guest) => item.id}
      />
      <Link style={styles.button} href="/new-guest">
        New Guest
      </Link>
    </>
  );
}
