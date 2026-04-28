import { For } from "solid-js";
import { notifications, dismissNotification } from "../../engine/notification";
import "./styles/NotificationSystem.css";

export default function NotificationSystem() {
    return (
        <div class="notification-container">
            <For each={notifications()}>
                {(notification) => (
                    <div
                        class={`notification-item ${notification.isClosing ? "closing" : ""}`}
                        onClick={() => dismissNotification(notification.id)}
                    >
                        <div class="notification-content">
                            <div class="notification-title">
                                {notification.title}
                            </div>
                            <div class="notification-text">
                                {notification.content}
                            </div>
                        </div>
                    </div>
                )}
            </For>
        </div>
    );
}
