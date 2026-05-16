import './PlayerMenu.css';
import { useState, useRef, useEffect } from "react";
import type { Player } from '../../types/player';
import { usePlayerStore } from '../../store/usePlayerStore';
import { motion, AnimatePresence } from 'framer-motion';
import { IconDots, IconEye, IconPencil } from '../../utils/icons';

function PlayerMenu({setIsVisible, player}: {setIsVisible: (value: boolean) => void, player: Player}){
    const [isOpen, setIsOpen] = useState(false);
    const setEditingPlayerId = usePlayerStore((state) => state.setEditingPlayerId);
    const menuRef = useRef<HTMLDivElement>(null);

    // Close menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuRef]);

    return (
        <div className="playerMenu" ref={menuRef}>
            <button className="playerMenu__button" onClick={() => setIsOpen(!isOpen)}>
                <IconDots width="1.5rem" height="1.5rem" color={isOpen ? "var(--primary-accent)" : "var(--text-secondary)"} />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        className="playerMenu__content"
                        initial={{ opacity: 0, scale: 0.9, y: -10, transformOrigin: "top right" }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        <ul>
                            <li>
                                <button
                                    className="playerMenu__item"
                                    onMouseDown={() => setIsVisible(true)}
                                    onMouseUp={() => setIsVisible(false)}
                                    onMouseLeave={() => setIsVisible(false)}
                                    onTouchStart={() => setIsVisible(true)}
                                    onTouchEnd={() => setIsVisible(false)}
                                >
                                    <IconEye width="1.2rem" height="1.2rem" />
                                    <span>Mantener para revelar</span>
                                </button>
                            </li>
                            <li>
                                <button
                                    className="playerMenu__item"
                                    onClick={() => {
                                        setEditingPlayerId(player.id);
                                        setIsOpen(false);
                                    }}
                                >
                                    <IconPencil width="1.2rem" height="1.2rem" />
                                    <span>Editar personaje</span>
                                </button>
                            </li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default PlayerMenu;
