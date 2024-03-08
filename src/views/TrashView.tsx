import { For, Show, createMemo, createResource } from "solid-js";
import Button from "../components/Button";
import EvaIcon from "../components/EvaIcon";
import { invoke } from "@tauri-apps/api";
import { GoalRecordSelectable } from "../types/Goal";
import { createStore, produce } from "solid-js/store";

export default function TrashView() {
    const [removedGoals, setRemovedGoals] = createStore<GoalRecordSelectable[]>([]);

    const fetchRemovedGoals = async () => {
        const res: string = await invoke("get_removed_goals_with_reflections");
        return JSON.parse(res).map((goal: GoalRecordSelectable) => { return { ...goal, selected: false } });
    };

    fetchRemovedGoals().then((goals) => {
        setRemovedGoals(goals);
    });

    const setSelected = (goal: GoalRecordSelectable, selected: boolean) => {
        const idx = removedGoals.findIndex((g: GoalRecordSelectable) => g.goal.id === goal.goal.id);
        setRemovedGoals(idx, produce((goal: GoalRecordSelectable) => {
            goal.selected = selected;
        }));
    };

    const getSelected = () => {
        return removedGoals.filter((g: GoalRecordSelectable) => g.selected);
    };

    const numSelected = createMemo(() => {
        return removedGoals.filter((g: GoalRecordSelectable) => g.selected).length;
    });
    
    const deleteSingle = (id) => {
        invoke("delete_goals_permanently", { ids: [id] });
    };

    const deleteSelected = () => {
        const ids = getSelected().map((g: GoalRecordSelectable) => g.goal.id);
        invoke("delete_goals_permanently", { ids });
    };

    const deleteAll = () => {
        const ids = removedGoals.map((g: GoalRecordSelectable) => g.goal.id);
        invoke("delete_goals_permanently", { ids });
    };

    const restoreSingle = (id) => {
        invoke("restore_deleted_goals", { ids: [id] });
    };

    const restoreSelected = () => {
        const ids = getSelected().map((g: GoalRecordSelectable) => g.goal.id);
        invoke("restore_deleted_goals", { ids });
    };

    const restoreAll = () => {
        const ids = removedGoals.map((g: GoalRecordSelectable) => g.goal.id);
        invoke("restore_deleted_goals", { ids });
    };

    const deselectAll = () => {
        removedGoals.forEach((idx) => {
            setSelected(idx, false);
        });
    };

    function ButtonBar() {
        return <div class="flex justify-center gap-2">
            <div class="grow">
                <Button onClick={deselectAll}>
                    Deselect all
                </Button>
            </div>
            <Button onClick={deleteSelected}
            >
                Delete {numSelected()} Selected
            </Button>
            <Button onClick={restoreSelected}
            >
                Restore {numSelected()} Selected
            </Button>
            <Button onClick={deleteAll}>
                Delete all
            </Button>
            <Button onClick={restoreAll}>
                Restore all
            </Button>
        </div>;
    }

    return <div class="flex flex-col h-full">
        <h1 class="my-4 text-lg font-bold text-soothe-400">Trash</h1>
        <ButtonBar />
        <ul class="bg-gaze-900/50 my-4 rounded-lg px-4 py-4 flex flex-col gap-4 overflow-y-scroll grow">
            <For each={removedGoals}>{
                (goal) => <li class="flex items-center gap-2 border text-gaze-300 bg-gaze-700/20 hover:bg-gaze-700/50 transition-colors border-white/10 rounded-md px-3 py-2">
                    <button onClick={() => {
                        setSelected(goal, !goal.selected);
                    }}>
                        <Show when={goal.selected} fallback={
                            <EvaIcon name="square-outline" fill="#FFF" class="w-6 h-6 fill-calm-400" />
                        }>
                            <EvaIcon name="checkmark-square-outline" fill="#FFF" class="w-6 h-6 fill-calm-400" />
                        </Show>
                    </button>
                    <div>
                    </div>
                    <span class="flex-grow">
                        {goal.goal.description}
                    </span>
                    <Button onClick={() => restoreSingle(goal.goal.id)}>Restore</Button>
                    <Button onClick={() => deleteSingle(goal.goal.id)}>Delete</Button>
                </li>
            }
            </For>
        </ul>
    </div>
}
