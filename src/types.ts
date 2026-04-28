export enum GameStage {
    LOADING_SCREEN,
    MAIN_MENU,
    PLAY,
    SAVES,
    SETTINGS,
    CREDITS,
}

export interface Progress {
    name: string;
    timestamp: number;
    data: number;
}

export interface UserData {
    name: string;
    email: string;
    currentSave: string;
    saves: {[key: string]: Progress};
}
