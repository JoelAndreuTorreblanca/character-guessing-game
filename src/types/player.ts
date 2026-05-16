export interface Player {
    id: string;
    name: string;
    character: string;
    description: string;
    hints: string[];
    hint_level: 1 | 4 | 7;
}
