/* @refresh reload */
import { render } from "solid-js/web";
import { Router, Route } from "@solidjs/router";

import "./styles.css";
import App from "./App";
import GoalsView from "./routes/GoalsView";

render(
  () => (
    <Router root={App}>
        <Route path="/" component={GoalsView} />
    </Router>
  ),
document.getElementById("root") as HTMLElement);
