/* @refresh reload */
import { render } from "solid-js/web";
import { Router, Route } from "@solidjs/router";

import "./styles.css";
import App from "./App";
import GoalsView from "./views/GoalsView";
import TrackProgressView from "./views/TrackProgressView";
import TrashView from "./views/TrashView";
import SettingsView from "./views/SettingsView";
import RemindView from "./views/RemindView";
import GoalDetails from "./views/GoalDetails";

render(
  () => (
    <Router root={App}>
        <Route path="/" component={GoalsView} />
        <Route path="/goal/:goalId" component={GoalDetails} />
        <Route path="/track" component={TrackProgressView} />
        <Route path="/trash" component={TrashView} />
        <Route path="/settings" component={SettingsView} />
        <Route path="/remind" component={RemindView} />
    </Router>
  ),
document.getElementById("root") as HTMLElement);
