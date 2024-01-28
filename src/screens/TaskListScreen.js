// screens/TaskListScreen.js
import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TaskListScreen = ({ navigation }) => {
    const [tasks, setTasks] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
  
    const loadTasks = async () => {
      try {
        // Retrieve tasks from AsyncStorage or initialize an empty array
        const storedTasks = await AsyncStorage.getItem('tasks');
        const parsedTasks = storedTasks ? JSON.parse(storedTasks) : [];
        setTasks(parsedTasks);
      } catch (error) {
        console.error('Error loading tasks:', error);
      }
    };
  
    const onRefresh = useCallback(() => {
      setRefreshing(true);
      // Load tasks when refreshing
      loadTasks();
      setRefreshing(false);
    }, []);
  
    useEffect(() => {
      // Load tasks when the component mounts
      loadTasks();
    }, []);
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task List</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.taskItem}
            onPress={() => navigation.navigate('TaskDetails', { task: item })}
          >
            <Text style={styles.taskTitle}>{item.title}</Text>
            <Text style={[styles.taskStatus, { color: item.completed ? '#4CAF50' : '#FF5722' }]}>
              {item.completed ? 'Completed' : 'Pending'}
            </Text>
          </TouchableOpacity>
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#0087E4']}
          />
        }
      />
      <Button
        title="Add Task"
        onPress={() => navigation.navigate('AddTask')}
        color="#4CAF50"
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#f0f0f0',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#333',
    },
    taskItem: {
      backgroundColor: '#fff',
      borderRadius: 8,
      padding: 16,
      marginBottom: 16,
    },
    taskTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
      color: '#333',
    },
    taskStatus: {
      fontSize: 14,
      color: '#4CAF50',
    },
  });

export default TaskListScreen;