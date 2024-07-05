// Filename: index.js
// Combined code from all files

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity, FlatList, ScrollView } from 'react-native';

const tales = [
    { id: '1', title: 'Cinderella', content: 'Once upon a time, there was a kind girl named Cinderella...' },
    { id: '2', title: 'Snow White', content: 'Once upon a time, there was a beautiful princess named Snow White...' },
    { id: '3', title: 'Little Red Riding Hood', content: 'Once upon a time, there was a little girl who always wore a red riding hood...' },
];

const HomeScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Fairy Tales</Text>
            <FlatList
                data={tales}
                renderItem={({ item }) => (
                    <TouchableOpacity 
                        style={styles.taleItem} 
                        onPress={() => navigation.navigate('Tale', { title: item.title, content: item.content })}
                    >
                        <Text style={styles.taleTitle}>{item.title}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    );
};

const TaleScreen = ({ route }) => {
    const { title, content } = route.params;

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.content}>{content}</Text>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        paddingTop: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 20,
    },
    taleItem: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    taleTitle: {
        fontSize: 18,
        color: '#333',
    },
    content: {
        fontSize: 16,
        color: '#666',
        paddingHorizontal: 15,
    },
});

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Tale" component={TaleScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}