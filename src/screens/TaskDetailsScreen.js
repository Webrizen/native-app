// screens/TaskDetailsScreen.js
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TaskDetailsScreen = ({ route, navigation }) => {
    const { task } = route.params;
    const handleCompleteTask = async () => {
        try {
            // Retrieve existing tasks from AsyncStorage
            const existingTasks = JSON.parse(await AsyncStorage.getItem('tasks')) || [];

            // Find the index of the task to update
            const taskIndex = existingTasks.findIndex((t) => t.id === task.id);

            // Update the completed status of the task
            existingTasks[taskIndex] = { ...task, completed: true };

            // Store the updated tasks back to AsyncStorage
            await AsyncStorage.setItem('tasks', JSON.stringify(existingTasks));

            // Navigate back to TaskListScreen
            navigation.goBack();
        } catch (error) {
            console.error('Error completing task:', error);
        }
    };

    const handleDeleteTask = async () => {
        try {
            // Retrieve existing tasks from AsyncStorage
            const existingTasks = JSON.parse(await AsyncStorage.getItem('tasks')) || [];

            // Filter out the task to delete
            const updatedTasks = existingTasks.filter((t) => t.id !== task.id);

            // Store the updated tasks back to AsyncStorage
            await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));

            // Navigate back to TaskListScreen
            navigation.goBack();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Task Details</Text>
            <View style={styles.taskDetails}>
                <Text style={styles.taskTitle}>{task.title}</Text>
                <Text style={styles.taskDescription}>{task.description}</Text>
                <Text style={[styles.taskStatus, { color: task.completed ? '#4CAF50' : '#FF5722' }]}>
                    {task.completed ? 'Completed' : 'Pending'}
                </Text>
            </View>
            <View style={styles.buttonContainer}>
                {!task.completed && (
                    <Button
                        title="Complete Task"
                        onPress={handleCompleteTask}
                        color="#4CAF50"
                    />
                )}
                <View style={styles.buttonGap} />
                <Button
                    title="Delete Task"
                    onPress={handleDeleteTask}
                    color="#FF5722"
                />
            </View>
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
    taskDetails: {
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
    taskDescription: {
        fontSize: 16,
        color: '#666',
        marginBottom: 8,
    },
    taskStatus: {
        fontSize: 14,
        color: '#4CAF50',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    buttonGap: {
        width: 1,
    },
});

export default TaskDetailsScreen;