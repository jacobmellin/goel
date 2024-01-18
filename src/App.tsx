import "./App.css";

import AddGoalModal from "./components/AddGoalModal";
import Header from "./components/Header";

import { InfoBar, useInfoBar } from './components/InfoBar';

import { listen } from '@tauri-apps/api/event';

function App(props: any) {
    const infoBar = useInfoBar();
    listen("goal-reminded", (data: any) => {
        console.log("goal-reminded", data);

        // TODO: Navigate to "Track" if window not visible!
        infoBar.showInfo("It is time to track progress on your goals!"); 
    });

    return (
        <main class="flex flex-col h-full">
            <Header />
            <div class="flex-1 px-6 overflow-y-scroll select-none cursor-default z-0">
                {props.children}
            </div>
            <AddGoalModal />
            <InfoBar />
            <footer class="text-xs text-center text-calm-500/50 px-2 mx-auto mb-4">Made with ❤️  by jacobmellin | Please consider buying me a coffee: <a target="_blank" class="text-calm-500 hover:text-calm-400 transition-all" href="https://ko-fi.com/jacobmellin">☕ ko-fi.com/jacobmellin</a> </footer>
        </main>
    );
}

export default App;
