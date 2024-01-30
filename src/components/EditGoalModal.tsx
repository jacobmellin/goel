import { invoke } from "@tauri-apps/api";
import { createStore } from "solid-js/store";

import Modal from "./Modal";
import GoalForm from "./partial/GoalForm";

import { GoalRecord } from '../types/Goal';
import { useInfoBar } from "./InfoBar";
import { useGoals } from "../store/goals";

interface EditGoalModalData {
    visible: boolean,
}

const [state, setState] = createStore<EditGoalModalData>({
    visible: false
});

const [goal, setGoal] = createStore<Partial<GoalRecord>>();

export const useEditGoalModal = () => {
    return {
        open(goal: GoalRecord) {
            setState({ visible: true });
            setGoal(goal);
        },
        close() {
            setState({ visible: false });
        }
    }
};

export default function EditGoalModal() {
    const infoBar = useInfoBar();
    const [, refetchGoals] = useGoals();

    const updateGoal = async (goal: Partial<GoalRecord>) => {
        try {
            await invoke("update_goal", { id: goal.id,  goalRaw: JSON.stringify(goal) });
            refetchGoals();
            infoBar.showInfo("Goal updated");
            setState({ visible: false });
        } catch(e) {
            infoBar.showError(`Error adding goal: ${e}`)
        }
    };

    return <Modal visible={state.visible} title="Edit goal">
        <GoalForm goal={goal} 
                  confirmLabel="Save goal"
                  onCancel={() => setState({ visible: false })} 
                  onSubmit={(g: Partial<GoalRecord>) => updateGoal(g)}
             />
    </Modal>;
}
