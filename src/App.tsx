import "./App.css";

import GoalsView from "./components/GoalsView";
import Header from "./components/Header";
import Modal from "./components/Modal";

function App() {
    return (
        <main class="flex flex-col h-full">
            <Header />
            <div class="flex-1 px-6 overflow-y-scroll select-none cursor-default z-0">
                <GoalsView />
            </div>
            <Modal title="Add a new goal" visible={false} />
            <footer class="text-xs text-center text-calm-500/50 px-2 mx-auto mb-4">Made with heart by jacobmellin | Please consider supporting: jacobmellin</footer>
        </main>
    );
}

export default App;
