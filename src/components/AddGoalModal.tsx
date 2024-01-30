import { invoke } from "@tauri-apps/api";
import { createStore } from "solid-js/store";

import Modal from "./Modal";
import GoalForm from "./partial/GoalForm";

import { GoalRecord } from '../types/Goal';
import { useInfoBar } from "./InfoBar";
import { useGoals } from "../store/goals";

interface AddGoalModalData {
    visible: boolean,
}

const [state, setState] = createStore<AddGoalModalData>({
    visible: false
});

export const useAddGoalModal = () => {
    return {
        open() {
            setState({ visible: true });
        },
        close() {
            setState({ visible: false });
        }
    }
};

export default function AddGoalModal() {
    const infoBar = useInfoBar();
    const [, refetchGoals] = useGoals();

    const createGoal = async (goal: Partial<GoalRecord>) => {
        console.log("hi");
        try {
            await invoke("new_goal", { goalJson: JSON.stringify(goal) });
            refetchGoals();
            infoBar.showInfo("Goal added");
            setState({ visible: false });
        } catch(e) {
            infoBar.showError(`Error adding goal: ${e}`)
        }
    };

    return <Modal visible={state.visible} title="Add a new goal">
        <GoalForm goal={{}} 
                  onCancel={() => setState({ visible: false })} 
                  onSubmit={(g: Partial<GoalRecord>) => createGoal(g)}
             />
    </Modal>;
}
