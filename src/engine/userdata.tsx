import { UserData } from "../types";
import { setCurrentScriptIndex } from "./script";

export let userdata: UserData = {
    name: "Lân",
    email: "lan@cteftu.id.vn",
    currentSave: "default",
    saves: {
        "default": {
            name: "Default Save",
            timestamp: 0,
            data: 4,
        },
    },
};

setCurrentScriptIndex(userdata.saves[userdata.currentSave].data);
