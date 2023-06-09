import { Link } from 'expo-router';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import UserCard from '../src/components/UserCard';
import { useAuthenticator } from '@aws-amplify/ui-react-native';
import { useEffect, useState } from 'react';
import { DataStore } from 'aws-amplify';
import { User } from '../src/models';

export default function Page() {
  const [users, setUsers] = useState([]);

  const { signOut } = useAuthenticator();

  useEffect(() => {
    // fetch users
    DataStore.query(User).then(setUsers);
  }, []);

  return (
    <View style={styles.container}>
          <Link href={'/newPost'} style={styles.text} >New post</Link>
          <Text onPress={() => signOut()} style={ styles.text }>Sign out</Text>
      <FlatList
        data={users}
        renderItem={({ item }) => <UserCard user={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 75,
  },
  text: {
    fontSize: 18,
    marginVertical: 5,
    marginTop: -10,
    marginBottom: 20,
    color: "black", 
  },
});

