import { createSignal, Signal, createMemo, batch } from "solid-js";
import { Scene, EventName } from "../registry";
import { SCRIPT } from "../gameScript";
import { invokeEvent } from "./events";
export { SCRIPT } from "../gameScript";

export type ScriptEntry =
    | [Scene, string, string, EventName | (() => void)]
    | [Scene, string, string];

export let [currentScriptIndex, setCurrentScriptIndex] = createSignal(0);

// Default to the first line
export let [currentLine, setCurrentLine] = createSignal<ScriptEntry>(SCRIPT[0]);

export const currentScene = createMemo(() => currentLine()[0]);

createMemo(() => {
    setCurrentLine(SCRIPT[currentScriptIndex()]);
});

export const getNextText = (): ScriptEntry | null => {
    // Always move to the NEXT line
    const nextIndex = currentScriptIndex() + 1;

    if (nextIndex >= SCRIPT.length) {
        return null;
    }

    setCurrentScriptIndex(nextIndex);
    let r = SCRIPT[nextIndex];

    return r;
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
        setCurrentLine(SCRIPT[0]);
    });
};
