import {
    createSignal,
    Signal,
    createMemo,
    batch,
    createEffect,
} from "solid-js";
import { EventName } from "../registry";
import { SCRIPT_DATA } from "../gameScript";
import { invokeEvent } from "./events";
export {
    moveWindow,
    moveWindowByTitle,
    getWindowApi,
    getWindowApiByTitle,
} from "./windowManager";

export type ScriptEntry = [
    string,
    string,
    string,
    (EventName | (() => void) | null)?,
    string?,
];

export type ScriptPath = ScriptEntry[];

// Pre-process tags for all paths
const TAG_INDEX: Record<string, Record<string, number>> = {};
Object.entries(SCRIPT_DATA).forEach(([pathName, entries]) => {
    TAG_INDEX[pathName] = {};
    entries.forEach((entry, idx) => {
        const tag = entry[4];
        if (tag) {
            TAG_INDEX[pathName][tag] = idx;
        }
    });
});

export let [currentPath, setCurrentPath] = createSignal<string>("intro_game1");
export let [currentScriptIndex, setCurrentScriptIndex] = createSignal(0);

// Default to the first line of the current path
export let [currentLine, setCurrentLine] = createSignal<ScriptEntry>(
    SCRIPT_DATA["intro_game1"][0],
);

export const currentScene = createMemo(() => currentLine()[0]);
export const sceneLevels = createMemo(() => currentScene().split("."));
export const sceneAt = (level: number) => sceneLevels()[level];

export const currentPathData = createMemo(
    () => SCRIPT_DATA[currentPath()] || SCRIPT_DATA["intro_game1"],
);

createMemo(() => {
    const path = currentPathData();
    setCurrentLine(path[currentScriptIndex()]);
});

// Automatically trigger callbacks for "hidden" lines (no speaker and no text)
// This ensures logic runs even if no UI component is currently mounted to handle it.
createEffect(() => {
    const line = currentLine();
    if (line && line[1] === "" && line[2] === "") {
        invokeCurrentTrigger();
    }
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

export const gotoLine = (tag: string, pathName?: string) => {
    const targetPath = pathName || currentPath();
    const index = TAG_INDEX[targetPath]?.[tag];

    if (index !== undefined) {
        batch(() => {
            setCurrentPath(targetPath);
            setCurrentScriptIndex(index);
            setCurrentLine(SCRIPT_DATA[targetPath][index]);
        });
    } else {
        console.error(`Tag "${tag}" not found in path "${targetPath}"`);
    }
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
