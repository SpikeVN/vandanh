import { UserData } from "../types";
import { setCurrentScriptIndex, setCurrentPath } from "./script";

export let userdata: UserData = {
    name: "Lân",
    email: "lan@cteftu.id.vn",
    currentSave: "default",
    saves: {
        default: {
            name: "Default Save",
            timestamp: 0,
            path: "intro_game1",
            index: 4,
        },
    },
};

export const loadUserdata = () => {
    const currentProgress = userdata.saves[userdata.currentSave];
    setCurrentPath(currentProgress.path);
    setCurrentScriptIndex(currentProgress.index);
};
