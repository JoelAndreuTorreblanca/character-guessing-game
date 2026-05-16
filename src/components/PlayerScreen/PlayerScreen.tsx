import { usePlayerStore } from '../../store/usePlayerStore';
import { useEffect, useState, useCallback } from 'react';
import PlayerInput from '../PlayerInput/PlayerInput';
import { TablerCirclePlusFilled } from '../../utils/icons';
import { motion, AnimatePresence } from 'framer-motion';
import './PlayerScreen.css';

function PlayerScreen() {
    const players = usePlayerStore((state) => state.players);
    const addPlayer = usePlayerStore((state) => state.addPlayer);
    const setPlayers = usePlayerStore((state) => state.setPlayers);
    const setGameState = usePlayerStore((state) => state.setGameState);

    // Local state for the name being typed
    const [newPlayerName, setNewPlayerName] = useState('');

    useEffect(() => {
        setPlayers([
            { id: crypto.randomUUID(), name: 'Joel', character: '', description: '', hints: [], hint_level: 1 },
            { id: crypto.randomUUID(), name: 'Andrea', character: '', description: '', hints: [], hint_level: 1 }
        ]);
    }, [setPlayers]);

    const handleAddPlayer = useCallback(() => {
        if(newPlayerName.trim() === '') return;
        if(players.length >= 8) return;

        addPlayer({ id: crypto.randomUUID(), name: newPlayerName, character: '', description: '', hints: [], hint_level: 1 });
        setNewPlayerName('');
    }, [newPlayerName, players.length, addPlayer]);

    const handleStartGame = useCallback(() => {
        handleAddPlayer();
        setGameState('playing');
    }, [handleAddPlayer, setGameState]);

    const handleRemovePlayer = useCallback((id: string) => {
        if(players.length <= 2) return;
        setPlayers(players.filter((player) => player.id !== id));
    }, [players, setPlayers]);

    return (
        <motion.div 
            id="playerScreen"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
        >
            <div className='players'>
                <motion.h1 layout>¿Quiénes van a jugar?</motion.h1>
                <motion.p layout className="subtitle">Añade de 2 a 8 jugadores</motion.p>
                <motion.div layout className='players__container'>
                    <AnimatePresence initial={false} mode="popLayout">
                        {players.map((player, index) => (
                            <motion.div
                                key={player.id}
                                layout
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.25, ease: "easeInOut" }}
                                style={{ marginBottom: 12, width: "100%" }}
                            >
                                <PlayerInput
                                    player={player}
                                    number={index + 1}
                                    onRemove={handleRemovePlayer}
                                />
                            </motion.div>
                        ))}
                        {players.length < 8 && (
                            <motion.div
                                key="new-player-input"
                                layout
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.25, ease: "easeInOut" }}
                                style={{ marginBottom: 12, width: "100%" }}
                            >
                                <PlayerInput
                                    number={players.length + 1}
                                    newName={newPlayerName}
                                    onChange={setNewPlayerName}
                                    onEnter={handleAddPlayer}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
                {players.length < 8 && (
                    <motion.button 
                        layout
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleAddPlayer} 
                        className='add__player__button' 
                        title="Agregar jugador"
                    >
                        <TablerCirclePlusFilled
                            width="2rem"
                            height="2rem"
                        />
                    </motion.button>
                )}
            </div>
            <motion.button 
                layout
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleStartGame} 
                className='start__game__button'
            >
                Empezar Juego
            </motion.button>
        </motion.div>
    )
}

export default PlayerScreen;
