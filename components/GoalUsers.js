import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { getUsersFromGoal, addUserToGoal } from '../Firebase/firestoreHelper';

function GoalUsers({ goalId }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      // check if there is data in firebase sub collection
      const storedUsers = await getUsersFromGoal(goalId);
      
      if (storedUsers.length > 0) {
        // set user data if there is
        setUsers(storedUsers);
      } else {
        // no data in firebase, use API
        try {
          const response = await fetch('https://jsonplaceholder.typicode.com/users');
          const apiUsers = await response.json();
          
          // store data from API to firebase sub collection
          for (let user of apiUsers) {
            if (user.name) {
              await addUserToGoal(goalId, { name: user.name });
            } else {
              console.error("User data missing name field:", user);
            }
          }
  
          // update set user
          setUsers(apiUsers);
        } catch (error) {
          console.error('error fetching user data:', error);
        }
      }
    };

    fetchUsers();
  }, [goalId]);

  // Function to send a POST request
  const addUserToServer = async () => {
    const fakeUser = {
      name: "John Doe", // fake user object
    };

    try {
      const response = await fetch('/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fakeUser),
      });

      if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Successfully added user:", data);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <View>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text>{item.name}</Text>
        )}
      />

      {/* button to trigger POST */}
      <Button title="Add Fake User" onPress={addUserToServer} />
    </View>
  );
}

export default GoalUsers;
