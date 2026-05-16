import PlayerScreen from './components/PlayerScreen/PlayerScreen';
import GameScreen from './components/GameScreen/GameScreen';
import './App.css'
import { usePlayerStore } from './store/usePlayerStore';
import { AnimatePresence } from 'framer-motion';

function App() {
    const gameState = usePlayerStore((state) => state.gameState);

    return (
        <AnimatePresence mode="wait">
            {gameState === 'setup' ?
                <PlayerScreen key="setup" />
            :
                <GameScreen key="game" />
            }
        </AnimatePresence>
    )
}

export default App;
