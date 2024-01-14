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
            <footer class="text-xs text-center text-calm-500/50 px-2 mx-auto mb-4">Made with ❤️  by jacobmellin <br/> Please consider buying me a coffee: <a target="_blank" class="text-calm-500 hover:text-calm-400 transition-all" href="https://ko-fi.com/jacobmellin">☕ ko-fi.com/jacobmellin</a> </footer>
        </main>
    );
}

export default App;
