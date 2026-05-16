import { usePlayerStore } from '../store/usePlayerStore';
import { ENV } from '../config/env';
import { buildPrompt } from '../utils/prompt';
import type { Player } from '../types/player';
import { useState } from 'react';

export const useHintGenerator = () => {
    const updatePlayer = usePlayerStore((state) => state.updatePlayer);
    const [isGenerating, setIsGenerating] = useState(false);

    const generateHint = async (player: Player) => {
        if(player.hints.length >= 3){
            console.log("Límite de pistas alcanzado.", player);
            return;
        }

        setIsGenerating(true);

        try {
            const prompt = buildPrompt(player);
            const nextLevel = player.hint_level < 7 ? (player.hint_level + 3) : 7;

            const respuesta = await fetch(ENV.API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{ text: prompt }]
                    }]
                })
            });

            if (!respuesta.ok) {
                throw new Error(`Error HTTP: ${respuesta.status}`);
            }

            const datos = await respuesta.json();
            const pista = datos.candidates[0].content.parts[0].text;

            const newPistas = [...player.hints, pista];
            updatePlayer(player.id, { hints: newPistas, hint_level: nextLevel as 1 | 4 | 7  });

        } catch (error) {
            console.error("Hubo un problema al generar la pista:", error);
        } finally {
            setIsGenerating(false);
        }
    };

    return { generateHint, isGenerating };
};
