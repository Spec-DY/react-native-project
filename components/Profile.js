
import React from 'react';
import { View, Text, Alert } from 'react-native';
import { auth } from "../Firebase/firebaseSetup";
import styles from '../style/styles';
import LocationManager from './LocationManager';

export default function Profile() {
  const user = auth.currentUser;

  return (
    <View style={styles.sign}>
      <Text>Profile</Text>
      {user ? (
        <>
          <Text>Email: {user.email}</Text>
          <Text>User ID: {user.uid}</Text>
        </>
      ) : (
        <Text>No user is signed in.</Text>
      )}
      <LocationManager />
    </View>
  );
}
