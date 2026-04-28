import DraggableWindow from "./winlib/DraggableWindow";
import StandardWindow from "./winlib/StandardWindow";

export default function ChatWindow() {
    return (
        <StandardWindow
            title="Tin nhắn"
            initialHeight={700}
            initialWidth={500}
            initialX={window.innerWidth - 350}
            initialY={25}
        ></StandardWindow>
    );
}
