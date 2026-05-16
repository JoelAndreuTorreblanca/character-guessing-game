import { create } from 'zustand';
import type { Player } from '../types/player';

interface PlayerState {
    players: Player[];
    gameState: 'setup' | 'playing';
    editingPlayerId: string | null;
    addPlayer: (player: Player) => void;
    setPlayers: (players: Player[]) => void;
    updatePlayer: (id: string, updates: Partial<Player>) => void;
    setGameState: (state: 'setup' | 'playing') => void;
    setEditingPlayerId: (id: string | null) => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
    players: [],
    gameState: 'setup',
    editingPlayerId: null,
    addPlayer: (player) => 
        set((state) => ({ players: [...state.players, player] })),
    setPlayers: (players) => 
        set({ players }),
    updatePlayer: (id, updates) =>
        set((state) => ({
            players: state.players.map((p) => p.id === id ? { ...p, ...updates } : p)
        })),
    setGameState: (gameState) => set({ gameState }),
    setEditingPlayerId: (id) => set({ editingPlayerId: id }),
}));
