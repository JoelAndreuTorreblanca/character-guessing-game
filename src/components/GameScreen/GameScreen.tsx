import { usePlayerStore } from '../../store/usePlayerStore';
import Player from '../Player/Player';
import './GameScreen.css';
import { useState } from 'react';
import CharacterModal from '../CharacterModal/CharacterModal';
import type { Player as PlayerType } from '../../types/player';
import { motion, AnimatePresence } from 'framer-motion';

function GameScreen() {
    const players = usePlayerStore((state) => state.players);
    const updatePlayer = usePlayerStore((state) => state.updatePlayer);
    const editingPlayerId = usePlayerStore((state) => state.editingPlayerId);
    const setEditingPlayerId = usePlayerStore((state) => state.setEditingPlayerId);
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

    const handleConfirmCharacter = (character: string, description: string) => {
        const currentPlayer = players[currentPlayerIndex];
        if (currentPlayer) {
            updatePlayer(currentPlayer.id, { character, description });
            setCurrentPlayerIndex((prev) => prev + 1);
        }
    };

    const handleConfirmEditCharacter = (character: string, description: string) => {
        if (editingPlayerId) {
            updatePlayer(editingPlayerId, { character, description });
            setEditingPlayerId(null);
        }
    };

    const isModalVisible = currentPlayerIndex < players.length || editingPlayerId !== null;
    const editingPlayer = editingPlayerId ? players.find(p => p.id === editingPlayerId) : null;

    return (
        <motion.div 
            id='gameScreen'
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
        >
            <AnimatePresence mode="wait">
                {isModalVisible && (
                    <CharacterModal
                        key={editingPlayerId ? editingPlayerId : players[currentPlayerIndex]?.id}
                        player={(editingPlayerId ? editingPlayer : players[currentPlayerIndex]) as PlayerType}
                        onConfirm={editingPlayerId ? handleConfirmEditCharacter : handleConfirmCharacter}
                        editCharacter={!!editingPlayerId}
                    />
                )}
            </AnimatePresence>
            <div className={`gameScreen__players grid__${players.length}`}>
                {players.map((player) => {
                    return <Player key={player.id} player={player} />
                })}
            </div>
        </motion.div>
    )
}

export default GameScreen;
