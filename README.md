# Character Guessing Game

## Description

Local multiplayer game of guessing a character set by the other players.

Designed to be run locally.

## Setup

- Requires Node.js version 20.19+ or 22.12+.
- Create a file `.env` in the root directory following the example in `.env.example`.
- Run `npm run dev` to start the application.


#### IMPORTANT
>
> This project is designed to append the API key as a query parameter at the end of the endpoint URL, like so:
> 
> `https://api.endpointurl.com/some-endpoint?key=YOUR_API_KEY`
> 
> Please ensure that you use an API service that supports this request format (such as Google Gemini).
>

## How to Play

1. **Player Registration:** On the first screen, enter the names of all participants.
2. **Character Setup:** On the game screen, secretly assign a character to each player.
3. **Gameplay & Interaction:**
   - **Player Cells:** Each player has a dedicated cell displaying their name and hints.
   - **Options Menu (Top-Right Button):**
     - **Reveal Character:** Reveals the character to everyone. This is a peek-and-hold feature (only visible while the button is held down).
     - **Edit Character:** Allows updating the character's name or its description.
   - **AI Hints:**
     - Each player has a **Hint** button. Pressing it generates a custom, AI-generated hint based on their character.
     - **Hint Limits:** Each player is limited to **3 hints** in total. To help you narrow down the guess, each successive hint is designed to be more revealing than the last!
