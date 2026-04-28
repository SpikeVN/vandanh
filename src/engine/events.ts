import { EventName } from "../registry";

let EVENT_DB: Record<string, () => void> = {};

export function registerEvent(trigger: EventName, callback: () => void) {
    EVENT_DB[trigger] = callback;
}

export function invokeEvent(trigger: EventName) {
    if (EVENT_DB[trigger]) {
        EVENT_DB[trigger]();
    } else {
        console.warn(`No event found for: ${trigger}`);
    }
}