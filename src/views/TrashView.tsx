import { For, createResource } from "solid-js";
import Button from "../components/Button";
import EvaIcon from "../components/EvaIcon";
import { invoke } from "@tauri-apps/api";

export default function TrashView() {
    const [deletedGoals,] = createResource(async () => {
        const res: string = await invoke("get_removed_goals_with_reflections");
        return JSON.parse(res);
    })

    return <div> 
        <h1 class="my-4 text-lg font-bold text-soothe-400">Trash</h1>
        <ul class="bg-gaze-900/50 my-4 rounded-lg px-4 py-4 flex flex-col gap-4">
        <div class="flex justify-center gap-2">
        <div class="grow">
        <Button>
        Deselect all
        </Button>
        </div>
        <Button>
        Delete 5 Selected goals
        </Button>
        <Button>
        Delete all goals
        </Button>
        </div>
            <For each={deletedGoals()}>{
                ({goal, reflection}) => <li class="flex items-center gap-2 border text-gaze-300 bg-gaze-700/20 hover:bg-gaze-700/50 transition-colors border-white/10 rounded-md px-3 py-2">
                <div>
                <EvaIcon name="square-outline" fill="#FFF" class="w-6 h-6 fill-calm-400"  />
                </div>
                <div>
                    <EvaIcon name="arrow-right-outline" fill="#FFF" class="w-6 h-6 fill-calm-400"  />
                </div>
                <span class="flex-grow">
                {goal.description}
                </span>
                <Button>Restore</Button>
                <Button>Delete</Button>
                </li>
            }
            </For>
        </ul>
    </div>;
}
