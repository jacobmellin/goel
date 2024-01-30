import { useNavigate } from "@solidjs/router";
import "./App.css";

import AddGoalModal from "./components/AddGoalModal";
import Header from "./components/Header";
import { InfoBar, useInfoBar } from './components/InfoBar';
import { listen } from '@tauri-apps/api/event';
import EditGoalModal from "./components/EditGoalModal";
import { JSXElement } from "solid-js";

function App(props: { children: JSXElement }) {
    const infoBar = useInfoBar();
    const navigate = useNavigate();

    listen("goal-reminded", () => {
        infoBar.showInfo("It is time to track progress on your goals!"); 
    });

    listen("shown-after-remind", () => {
        navigate("/track"); 
    });

    return (
        <main class="flex flex-col h-full">
            <Header />
            <div class="flex-1 px-6 overflow-y-scroll select-none cursor-default z-0">
                {props.children}
            </div>
            <AddGoalModal />
            <EditGoalModal />
            <InfoBar />
            <footer class="text-xs text-center text-calm-500/50 px-2 mx-auto mb-4">Made with ❤️  by jacobmellin | Please consider buying me a coffee: <a target="_blank" class="text-calm-500 hover:text-calm-400 transition-all" href="https://ko-fi.com/jacobmellin">☕ ko-fi.com/jacobmellin</a> </footer>
        </main>
    );
}

export default App;
