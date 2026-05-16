import type { Player as PlayerType } from '../../types/player';
import PlayerPicture from '../PlayerPicture/PlayerPicture';
import './Player.css';
import PlayerMenu from '../PlayerMenu/PlayerMenu';
import ShowCharacter from '../ShowCharacter/ShowCharacter';
import { useState } from 'react';
import { useHintGenerator } from '../../hooks/useHintGenerator';
import { motion, AnimatePresence } from 'framer-motion';
import { IconWand, IconLoader2 } from '../../utils/icons';

interface PlayerProps {
    player: PlayerType;
}

function Player({player}: PlayerProps) {
    const [isVisible, setIsVisible] = useState(false);
    const { generateHint, isGenerating } = useHintGenerator();

    return (
        <motion.div 
            className='player'
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
        >
            <PlayerMenu setIsVisible={setIsVisible} player={player}/>
            <AnimatePresence>
                {isVisible && (<ShowCharacter player={player}/>)}
            </AnimatePresence>
            <div className="player__wrapper">
                <div className='player__left'>
                    <div className='player__pic'>
                        <PlayerPicture />
                    </div>
                    <span className='player__name'>
                        {player.name}
                    </span>
                    <motion.button 
                        whileHover={(player.hints.length >= 3 || isGenerating) ? {} : { scale: 1.05 }}
                        whileTap={(player.hints.length >= 3 || isGenerating) ? {} : { scale: 0.95 }}
                        disabled={player.hints.length >= 3 || isGenerating} 
                        onClick={() => generateHint(player)} 
                        className={`hint-btn ${isGenerating ? 'is-generating' : ''}`}
                    >
                        {isGenerating ? (
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                            >
                                <IconLoader2 width="1.2rem" height="1.2rem" />
                            </motion.div>
                        ) : (
                            <IconWand width="1.2rem" height="1.2rem" />
                        )}
                        {isGenerating ? 'Generando...' : 'Pista'}
                    </motion.button>
                </div>
                <div className='player__right'>
                    <div className='hint__container'>
                        <div className='hint__container__title'>
                            Pistas
                        </div>
                        <div className='hint__container__body'>
                            <AnimatePresence>
                                {player.hints.map((hint, index) => (
                                    <motion.p 
                                        key={index}
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <span className="hint__index">{index + 1}.</span> {hint}
                                    </motion.p>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default Player;
