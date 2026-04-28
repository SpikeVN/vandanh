import StandardWindow from "./winlib/StandardWindow";
import VisualNovelTextWindow from "./VisualNovelTextWindow";
import { SCRIPT } from "../engine/scriptManager";
import { createSignal } from "solid-js";
import DSTCWindow from "./DSTCWindow";
import { EventName, UserData } from "..";

export default function Game(props: {userdata: UserData}) {
    // Example text for the visual novel
    const textLines = SCRIPT;

    let [currentLine, setCurrentLine] = createSignal(0);

    const getNextText = ():
        | [string, string]
        | [string, string, EventName]
        | [string, string, () => void]
        | null => {
        if (currentLine() >= textLines.length) {
            return null;
        }
        let r = textLines[currentLine()];
        setCurrentLine(currentLine() + 1);
        return r;
    };

    const handleDone = () => {
        console.log("Visual novel finished!");
        // Reset for replay
        setCurrentLine(0);
    };

    return (
        <div>
            <DSTCWindow userdata={props.userdata} />

            {/* <VisualNovelTextWindow
                getNextText={getNextText}
                onDone={handleDone}
            /> */}
        </div>
    );
}
