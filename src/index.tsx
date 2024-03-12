/* @refresh reload */
import { render } from "solid-js/web";
import { Router, Route } from "@solidjs/router";

import "./styles.css";
import App from "./App";
import GoalsView from "./views/GoalsView";
import TrackProgressView from "./views/TrackProgressView";
import TrashView from "./views/TrashView";
import SettingsView from "./views/SettingsView";
import GoalDetails from "./views/GoalDetails";
import { useFontSize } from "./store/fontSize";
import { createEffect } from "solid-js";
import { os } from "@tauri-apps/api";

function Root() {
    os.type().then((osType) => {
        console.log(osType);

        if(osType === 'Linux') {
           // Detect window manager 
           // TODO
           // document.documentElement.classList.remove('special-decoration');
        }
    });

    const [fontSize] = useFontSize();

    createEffect(() => {
        if(typeof fontSize() !== 'undefined') {
            const fs = fontSize()!.toString(); 
            document.querySelector("html")!.style.setProperty('--global-font-size', fs + "px");
        }
    });

    return <Router root={App}>
        <Route path="/" component={GoalsView} />
        <Route path="/goal/:goalId" component={GoalDetails} />
        <Route path="/track" component={TrackProgressView} />
        <Route path="/trash" component={TrashView} />
        <Route path="/settings" component={SettingsView} />
    </Router>;
}

render(Root, document.getElementById("root") as HTMLElement);
