/* @refresh reload */
import "./index.css";
import { render } from "solid-js/web";
import "solid-devtools";
import App from "./App";
export { type EventName } from "./engine/eventRegistry";

const root = document.getElementById("root");

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
    saves: Map<string, Progress>;
}

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
    throw new Error(
        "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?",
    );
}

render(() => <App />, root!);
