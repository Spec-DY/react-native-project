import React, { useState } from "react";
import { View, Button, Image, StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

const ImageManager = ({ onImageTaken }) => {
  const [permissionResponse, requestPermission] = ImagePicker.useCameraPermissions();

  const verifyPermission = async () => {
    if (permissionResponse && permissionResponse.granted) {
      return true;
    }
    const permissionResult = await requestPermission();
    return permissionResult.granted;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      Alert.alert("Permission Denied", "Camera access is required to take pictures.");
      return;
    }

    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        quality: 0.5,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const uri = result.assets[0].uri;
        console.log("image uri: ", uri)
        onImageTaken(uri); // Pass URI to parent component
      }
    } catch (err) {
      console.log("Error opening camera:", err);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Take Picture" onPress={takeImageHandler} />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 10,
  }

});

export default ImageManager;
