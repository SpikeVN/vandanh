import { createSignal } from "solid-js";

export interface NotificationData {
    id: string;
    title: string;
    content: string;
    duration: number;
    isClosing?: boolean;
}

const [notifications, setNotifications] = createSignal<NotificationData[]>([]);

export { notifications };

export function showNotification(title: string, content: string, duration = 5000) {
    const id = Math.random().toString(36).substring(2, 9);
    const newNotification: NotificationData = { id, title, content, duration };

    setNotifications((prev) => [...prev, newNotification]);

    if (duration > 0) {
        setTimeout(() => {
            dismissNotification(id);
        }, duration);
    }

    return id;
}

export function dismissNotification(id: string) {
    setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isClosing: true } : n)),
    );

    // Wait for animation to finish before removing from state
    setTimeout(() => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 300); // Matches CSS animation duration
}
