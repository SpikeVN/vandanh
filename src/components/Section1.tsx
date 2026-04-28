import { Match, Switch } from "solid-js";
import { currentScene } from "../engine/script";
import DSTCWindow from "./DSTCWindow";
import VisualNovelTextWindow from "./VisualNovelTextWindow";
import FullScreenNarrator from "./FullScreenNarrator";

export default function Section1() {
    return (
        <Switch>
            <Match when={currentScene() == "s1.blank"}>
                <FullScreenNarrator />
            </Match>
            <Match when={currentScene() == "s1.leadin"}>
                <VisualNovelTextWindow />
            </Match>
            <Match when={currentScene() == "s1.registration"}>
                <DSTCWindow />
                <VisualNovelTextWindow />
            </Match>
        </Switch>
    );
}
