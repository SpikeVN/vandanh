import { createSignal } from "solid-js";
import { DraggableWindowAPI } from "../components/winlib/DraggableWindow";

export interface WindowInfo {
    id: string;
    title: string;
    api: DraggableWindowAPI;
}

const debuginfo = import.meta.env.DEV ? (...x: any[]) => console.log(...x) : (..._: any[]) => {}

const [windowDb, setWindowDb] = createSignal<Record<string, WindowInfo>>({});

export { windowDb };

export function registerWindow(
    id: string,
    title: string,
    api: DraggableWindowAPI,
) {
    console.log(`[WindowManager] Registering window: "${id}" (${title})`);
    setWindowDb((prev) => ({
        ...prev,
        [id]: { id, title, api },
    }));
}

export function unregisterWindow(id: string) {
    setWindowDb((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
    });
}

export function getWindowApi(id: string): DraggableWindowAPI | undefined {
    return windowDb()[id]?.api;
}

export function getWindowByTitle(title: string): WindowInfo | undefined {
    return Object.values(windowDb()).find((w) => w.title === title);
}

export function getWindowApiByTitle(
    title: string,
): DraggableWindowAPI | undefined {
    return getWindowByTitle(title)?.api;
}

/**
 * Move a window by its registered ID.
 */
export function moveWindow(
    id: string,
    x: number,
    y: number,
    options?: gsap.TweenVars,
) {
    console.log(`[WindowManager] Moving window: "${id}" to (${x}, ${y})`);
    const api = getWindowApi(id);
    if (api) {
        api.moveTo(x, y, options);
    } else {
        console.warn(
            `[WindowManager] Window with ID "${id}" not found. Current windows:`,
            Object.keys(windowDb()),
        );
    }
}

/**
 * Move a window by its title.
 */
export function moveWindowByTitle(
    title: string,
    x: number,
    y: number,
    options?: gsap.TweenVars,
) {
    debuginfo(
        `[WindowManager] Moving window by title: "${title}" to (${x}, ${y})`,
    );
    const info = getWindowByTitle(title);
    if (info) {
        info.api.moveTo(x, y, options);
    } else {
        console.warn(
            `[WindowManager] Window with title "${title}" not found. Available titles:`,
            Object.values(windowDb()).map((w) => w.title),
        );
    }
}
