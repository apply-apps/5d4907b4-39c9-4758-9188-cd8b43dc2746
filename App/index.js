// Filename: index.js
// Combined code from all files

import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import Matter from 'matter-js';

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;
const BOX_SIZE = 20;
const INIT_SNAKE_SPEED = 100;
const INIT_SNAKE_SIZE = 5;

const Snake = (props) => {
    const { size, position } = props;

    return (
        <View
            style={{
                width: size[0],
                height: size[1],
                backgroundColor: 'green',
                position: 'absolute',
                left: position[0],
                top: position[1],
            }}
        />
    );
};

const Food = (props) => {
    const { position, size } = props;

    return (
        <View
            style={{
                width: size[0],
                height: size[1],
                backgroundColor: 'red',
                position: 'absolute',
                left: position[0],
                top: position[1],
            }}
        />
    );
};

const GameLoop = (entities, { touches, dispatch, events }) => {
    let head = entities.head;
    let food = entities.food;
    let tail = entities.tail;

    // Simple move logic here (e.g., arrow keys, touch gestures)
    // Detect collision with food to grow snake size and increment score
    // Detect collision with walls or self to trigger game over

    return entities;
};

export default function App() {
    const [running, setRunning] = useState(false);
    const [score, setScore] = useState(0);
    const [entities, setEntities] = useState({});
    const [gameEngine, setGameEngine] = useState(null);

    const resetGame = useCallback(() => {
        setRunning(true);
        gameEngine.swap({
            head: { position: [25, 25], size: [BOX_SIZE, BOX_SIZE], renderer: <Snake /> },
            food: { position: getRandomPosition(), size: [BOX_SIZE, BOX_SIZE], renderer: <Food /> },
            tail: [],
            speed: INIT_SNAKE_SPEED,
            score: 0,
        });
        setScore(0);
    }, [gameEngine]);

    useEffect(() => {
        if (gameEngine) {
            resetGame();
        }
    }, [gameEngine, resetGame]);

    const getRandomPosition = () => {
        const x = Math.floor(Math.random() * (WINDOW_WIDTH / BOX_SIZE));
        const y = Math.floor(Math.random() * (WINDOW_HEIGHT / BOX_SIZE));
        return [x * BOX_SIZE, y * BOX_SIZE];
    };

    const onEvent = (e) => {
        if (e.type === "game-over") {
            setRunning(false);
            setScore(0);
        } else if (e.type === "score") {
            setScore(e.score);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.score}>Score: {score}</Text>
            <GameEngine
                ref={(ref) => setGameEngine(ref)}
                style={styles.gameContainer}
                systems={[GameLoop]}
                entities={entities}
                running={running}
                onEvent={onEvent}
            />
            {!running && (
                <TouchableOpacity style={styles.startButton} onPress={resetGame}>
                    <Text style={styles.startButtonText}>Start Game</Text>
                </TouchableOpacity>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    score: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    gameContainer: {
        width: WINDOW_WIDTH,
        height: WINDOW_HEIGHT,
        backgroundColor: '#FAFAFA',
    },
    startButton: {
        backgroundColor: '#0A84FF',
        padding: 10,
        borderRadius: 5,
    },
    startButtonText: {
        color: '#FFF',
        fontSize: 18,
    },
});