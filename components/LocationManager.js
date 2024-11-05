import React, { useEffect } from 'react';
import { View, Button, Alert } from 'react-native';
import * as Location from 'expo-location';

const LocationManager = () => {
  const [response, requestPermission] = Location.useForegroundPermissions();

  // Function to verify permissions
  const verifyPermission = async () => {
    // Check if permission is granted
    if (response && response.granted) {
        console.log("location response is: ", response)
      return true;
    }

    // Request permission if not granted
    const permissionResponse = await requestPermission();
    console.log("permission response is: ", permissionResponse)
    return permissionResponse.granted;
  };

  // Locate user handler
  const locateUserHandler = async () => {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      Alert.alert('Permission needed', 'You need to grant location permissions to use this feature.');
      return;
    }

    try {
      // Get user location
      const location = await Location.getCurrentPositionAsync({});
      Alert.alert(
        'Location Retrieved',
        `Latitude: ${location.coords.latitude}, Longitude: ${location.coords.longitude}`
      );
    } catch (err) {
      Alert.alert('Error', 'An error occurred while fetching location.');
      console.error(err);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Button title="Locate Me" onPress={locateUserHandler} />
    </View>
  );
};

export default LocationManager;
