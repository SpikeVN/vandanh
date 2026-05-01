import { Match, Switch } from "solid-js";
import { sceneAt } from "../engine/script";
import VisualNovelTextWindow from "./VisualNovelTextWindow";
import FullScreenNarrator from "./FullScreenNarrator";
import StandardWindow from "./winlib/StandardWindow";

export default function Section1() {
    return (
        <>
            <Switch>
                <Match when={sceneAt(1) == "blank"}>
                    <FullScreenNarrator />
                </Match>
                <Match when={sceneAt(1) == "leadin"}>
                    <StandardWindow>
                        hi
                    </StandardWindow>
                    <VisualNovelTextWindow />
                </Match>
            </Switch>
        </>
    );
}
