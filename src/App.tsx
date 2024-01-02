import "./App.css";

import AddGoalModal from "./components/AddGoalModal";
import Header from "./components/Header";

import { InfoBar } from './components/InfoBar';

function App(props: any) {
    return (
        <main class="flex flex-col h-full">
            <Header />
            <div class="flex-1 px-6 overflow-y-scroll select-none cursor-default z-0">
                {props.children}
            </div>
            <AddGoalModal />
            <InfoBar />
            <footer class="text-xs text-center text-calm-500/50 px-2 mx-auto mb-4">Made with heart by jacobmellin | Please consider supporting: jacobmellin</footer>
        </main>
    );
}

export default App;
