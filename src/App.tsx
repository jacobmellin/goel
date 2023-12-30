import { createSignal } from "solid-js";

import "./App.css";

import AddGoalModal from "./components/AddGoalModal";
import GoalsView from "./components/GoalsView";
import Header from "./components/Header";
import InfoModal from "./components/InfoModal";

function App() {
    const [showAddGoalModal, setShowAddGoalModal] = createSignal(false);

    return (
        <main class="flex flex-col h-full">
            <Header />
            <div class="flex-1 px-6 overflow-y-scroll select-none cursor-default z-0">
                <GoalsView 
                    disabled={showAddGoalModal()}
                    addGoalClicked={() => setShowAddGoalModal(true)}
                    />
            </div>
            <AddGoalModal 
                visible={showAddGoalModal()}
                onCancel={() => setShowAddGoalModal(false)}
                />
            <InfoModal>New goal created!</InfoModal>
            <footer class="text-xs text-center text-calm-500/50 px-2 mx-auto mb-4">Made with heart by jacobmellin | Please consider supporting: jacobmellin</footer>
        </main>
    );
}

export default App;
