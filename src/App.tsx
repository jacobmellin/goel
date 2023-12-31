import { createResource, createSignal } from "solid-js";
import { invoke } from '@tauri-apps/api';

import "./App.css";

import AddGoalModal from "./components/AddGoalModal";
import GoalsView from "./components/GoalsView";
import Header from "./components/Header";
import { createInfoBar } from "./components/InfoBar";

import { GoalRecord } from "./types/Goal";

function App() {
    const [showAddGoalModal, setShowAddGoalModal] = createSignal(false);

    const [InfoBar, showInfo, showError] = createInfoBar();

    const [goals, { refetch }] = createResource<GoalRecord[]>(async () => {
        const goals: string = await invoke("get_goals");
        return JSON.parse(goals);
    });

    return (
        <main class="flex flex-col h-full">
            <Header />
            <div class="flex-1 px-6 overflow-y-scroll select-none cursor-default z-0">
                <GoalsView
                    disabled={showAddGoalModal()}
                    goals={goals()}
                    addGoalClicked={() => setShowAddGoalModal(true)}
                />
            </div>
            <AddGoalModal
                visible={showAddGoalModal()}
                onModalHide={() => setShowAddGoalModal(false)}
                onGoalAdded={() => { refetch(); showInfo("New Goal added!"); }}
                onGoalAddError={(errorMsg: string) => showError(`Failed to add goal: ${errorMsg}`)}
            />
            <InfoBar />
            <footer class="text-xs text-center text-calm-500/50 px-2 mx-auto mb-4">Made with heart by jacobmellin | Please consider supporting: jacobmellin</footer>
        </main>
    );
}

export default App;
