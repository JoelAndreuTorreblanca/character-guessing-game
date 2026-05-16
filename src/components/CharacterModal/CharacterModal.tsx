import { useState } from 'react';
import type { Player } from '../../types/player';
import './CharacterModal.css';
import { usePlayerStore } from '../../store/usePlayerStore';
import { motion } from 'framer-motion';

interface CharacterModalProps {
    player: Player;
    onConfirm: (character: string, description: string) => void;
    editCharacter: boolean;
}

function CharacterModal({ player, onConfirm, editCharacter }: CharacterModalProps) {
    const setEditingPlayerId = usePlayerStore((state) => state.setEditingPlayerId);
    const [character, setCharacter] = useState(editCharacter ? player.character : '');
    const [description, setDescription] = useState(editCharacter ? player.description : '');

    const handleConfirm = () => {
        if(!character.trim()) return;

        onConfirm(character, description);
        // Reset fields for the next player
        setCharacter('');
        setDescription('');
    };

    return (
        <motion.div 
            id="characterModal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <motion.div 
                className="characterModal__wrapper"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", bounce: 0.4, duration: 0.5 }}
            >
                <div className="characterModal__body">
                    <div className="characterModal__title">
                        <h2>Personaje para <span className="highlight">{player.name}</span></h2>
                    </div>
                    <div className="characterModal__input-wrapper">
                        <input
                            type="text"
                            placeholder="Nombre del personaje"
                            name="characterName"
                            value={character}
                            onChange={(e) => setCharacter(e.target.value)}
                            autoFocus
                        />
                        <span className="characterModal__input-description">Ej: Pedro Sánchez</span>
                    </div>
                    <div className="characterModal__input-wrapper">
                        <input
                            type="text"
                            name="description"
                            placeholder="Breve descripción"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <span className="characterModal__input-description">Ej: Presidente del Gobierno de España</span>
                    </div>
                </div>
                <div className="characterModal__footer">
                    {editCharacter && 
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="characterModal__cancel" 
                            onClick={() => setEditingPlayerId(null)}
                        >
                            Cancelar
                        </motion.button>
                    }
                    <motion.button 
                        whileHover={character.trim() ? { scale: 1.05 } : {}}
                        whileTap={character.trim() ? { scale: 0.95 } : {}}
                        className="characterModal__confirm" 
                        onClick={handleConfirm} 
                        disabled={!character.trim()}
                    >
                        {editCharacter ? 'Actualizar' : 'Continuar'}
                    </motion.button>
                </div>
            </motion.div>
        </motion.div>
    )
}

export default CharacterModal;
