import { EventName } from "..";

let TRIGGER_DB: Record<string, () => void> = {};

export function registerEvent(trigger: EventName, callback: () => void) {
    TRIGGER_DB[trigger] = callback;
}

export function invokeEvent(trigger: EventName) {
    if (TRIGGER_DB[trigger]) {
        TRIGGER_DB[trigger]();
    } else {
        console.warn(`No event found for: ${trigger}`);
    }
}