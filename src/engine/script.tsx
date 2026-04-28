import { createSignal, Signal, createMemo, batch } from "solid-js";
import { Scene, EventName } from "../registry";
import { SCRIPT_DATA } from "../gameScript";
import { invokeEvent } from "./events";

export type ScriptEntry =
    | [Scene, string, string, EventName | (() => void)]
    | [Scene, string, string];

export type ScriptPath = ScriptEntry[];

export let [currentPath, setCurrentPath] = createSignal<string>("intro_game1");
export let [currentScriptIndex, setCurrentScriptIndex] = createSignal(0);

// Default to the first line of the current path
export let [currentLine, setCurrentLine] = createSignal<ScriptEntry>(
    SCRIPT_DATA["intro_game1"][0],
);

export const currentScene = createMemo(() => currentLine()[0]);

export const currentPathData = createMemo(
    () => SCRIPT_DATA[currentPath()] || SCRIPT_DATA["intro_game1"],
);

createMemo(() => {
    const path = currentPathData();
    setCurrentLine(path[currentScriptIndex()]);
});

export const getNextText = (): ScriptEntry | null => {
    // Always move to the NEXT line
    const nextIndex = currentScriptIndex() + 1;
    const path = currentPathData();

    if (nextIndex >= path.length) {
        return null;
    }

    setCurrentScriptIndex(nextIndex);
    let r = path[nextIndex];

    return r;
};

export const switchPath = (pathName: string, startIndex: number = 0) => {
    batch(() => {
        setCurrentPath(pathName);
        setCurrentScriptIndex(startIndex);
        setCurrentLine(currentPathData()[startIndex]);
    });
};

export const invokeCurrentTrigger = () => {
    const line = currentLine();
    if (!line) return;

    if (typeof line[3] === "string") {
        invokeEvent(line[3]);
    } else if (typeof line[3] === "function") {
        line[3]();
    }
};

export const handleDone = () => {
    batch(() => {
        setCurrentScriptIndex(0);
        setCurrentLine(SCRIPT_DATA[currentPath()][0]);
    });
};
