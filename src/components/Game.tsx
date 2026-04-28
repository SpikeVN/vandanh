import { Match, Switch } from "solid-js";
import { currentScene } from "../engine/script";
import Section1 from "./Section1";

export default function Game() {
    return (
        <Switch>
            <Match when={currentScene().startsWith("s1.")}>
                <Section1 />
            </Match>
        </Switch>
    );
}
