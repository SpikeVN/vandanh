import { Match, Show, Switch } from "solid-js";
import { sceneAt } from "../engine/script";
import DSTCWindow from "./DSTCWindow";
import VisualNovelTextWindow from "./VisualNovelTextWindow";
import FullScreenNarrator from "./FullScreenNarrator";
import ChatWindow from "./ChatWindow";

export default function Section1() {
    return (
        <>
            <Switch>
                <Match when={sceneAt(1) == "blank"}>
                    <FullScreenNarrator />
                </Match>
                <Match when={sceneAt(1) == "leadin"}>
                    <VisualNovelTextWindow />
                </Match>
                <Match
                    when={sceneAt(1) == "registration" || sceneAt(1) == "chat"}
                >
                    <DSTCWindow />
                    <Show when={sceneAt(1) != "chat"}>
                        <VisualNovelTextWindow />
                    </Show>
                </Match>
            </Switch>
            <Show when={sceneAt(1) == "chat"}>
                <ChatWindow />
            </Show>
        </>
    );
}
