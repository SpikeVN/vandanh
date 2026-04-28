import { Match, Switch } from "solid-js";
import { sceneAt } from "../engine/script";
import Section1 from "./Section1";

export default function Game() {
    return (
        <Switch>
            <Match when={sceneAt(0) === "s1"}>
                <Section1 />
            </Match>
        </Switch>
    );
}
