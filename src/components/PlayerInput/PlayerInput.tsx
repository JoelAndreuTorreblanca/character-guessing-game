import type { Player } from '../../types/player';
import { TablerX } from '../../utils/icons';
import './PlayerInput.css';
import { useState } from 'react';
import { usePlayerStore } from '../../store/usePlayerStore';
import { motion } from 'framer-motion';

interface PlayerInputProps {
    number: number;
    player?: Player;
    newName?: string;
    onChange?: (name: string) => void;
    onRemove?: (id: string) => void;
    onEnter?: () => void;
}

function PlayerInput({ number, player, newName, onChange, onRemove, onEnter }: PlayerInputProps) {
    const updatePlayer = usePlayerStore((state) => state.updatePlayer);

    const [editName, setEditName] = useState(false);
    const [editingName, setEditingName] = useState(newName);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(editName) return;

        if (e.key === 'Enter') {
            e.preventDefault();
            if (onEnter) onEnter();
        }
    }

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(editName){
            setEditingName(e.target.value);
        }else{
            if (onChange) onChange(e.target.value);
        }
    }

    const handleOnBlur = () => {
        if(!editName || !player) return;
        updatePlayer(player.id, { name: editingName || '' });
        setEditName(false);
    }

    return (
        <div className="playerInput input-player">
            <span className="player__id">{number}</span>
            {player && !editName ?
                <span
                className="input-player__name"
                onDoubleClick={() => {setEditName(true); setEditingName(player.name);}}>
                    {player.name}
                </span>
            :
                <input
                value={player && editName ? editingName : newName}
                onChange={(e) => handleOnChange(e)}
                onKeyDown={handleKeyDown}
                onBlur={handleOnBlur}
                type="text"
                className="input-player__name--input"
                placeholder="Escribe un nombre..."
                autoFocus={player && editName}
                />
            }
            {player && onRemove ?
                <motion.button 
                    whileHover={{ scale: 1.1, color: "var(--danger-soft)" }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onRemove(player.id)} 
                    className="player__remove"
                >
                    <TablerX
                        width="1.5rem"
                        height="1.5rem"
                    />
                </motion.button>
            : ''}
        </div>
    )
}

export default PlayerInput;
