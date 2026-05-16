import type { Player } from "../../types/player";
import './ShowCharacter.css';
import { motion } from "framer-motion";

function ShowCharacter({player}: {player: Player}) {
    return(
        <motion.div 
            className="showCharacter"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
        >
            <motion.div 
                className="showCharacter__card"
                initial={{ scale: 0.8, opacity: 0, y: 10 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 10 }}
                transition={{ type: "spring", bounce: 0.5 }}
            >
                <div className="showCharacter__character">{player.character || "????"}</div>
                {player.description && <div className="showCharacter__description">{player.description}</div>}
            </motion.div>
        </motion.div>
    );
}

export default ShowCharacter;
