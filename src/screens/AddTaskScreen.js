// screens/AddTaskScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddTaskScreen = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleAddTask = async () => {
        try {
            // Retrieve existing tasks from AsyncStorage or initialize an empty array
            const existingTasksJSON = await AsyncStorage.getItem('tasks');
            const existingTasks = existingTasksJSON ? JSON.parse(existingTasksJSON) : [];

            // Create a new task
            const newTask = {
                id: String(Date.now()),
                title,
                description,
                completed: false,
            };

            // Update the tasks array with the new task
            const updatedTasks = [...existingTasks, newTask];

            // Store the updated tasks back to AsyncStorage
            await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));

            // Navigate back to TaskListScreen
            navigation.goBack();
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add Task</Text>
            <TextInput
                style={styles.input}
                placeholder="Title"
                value={title}
                onChangeText={(text) => setTitle(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Description"
                value={description}
                onChangeText={(text) => setDescription(text)}
            />
            <Button
                title="Add Task"
                onPress={handleAddTask}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        padding: 10,
    },
});

export default AddTaskScreen;