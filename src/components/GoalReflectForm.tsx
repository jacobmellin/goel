import TextareaInput from "./TextareaInput"
import RatingSlider from "./RatingSlider"
import Button from "./Button"
import ButtonPrimary from "./ButtonPrimary"
import EvaIcon from "./EvaIcon"
import { Show, createEffect, createSignal } from "solid-js"
import { createStore } from "solid-js/store";
import { GoalRecord } from "../types/Goal"

interface ReflectData {
    goalId: string,
    rating?: number,
    barriersReflection?: string,
    successReflection?: string
}

interface GoalReflectFormProps {
    onExpandChanged?: (isExpanded: boolean) => void,
    onSubmit: (reflectData: ReflectData) => void,
    onSkip: () => void,
    goal: GoalRecord
    finished: boolean
}

export default function GoalReflectForm(props: GoalReflectFormProps) {
    const [expanded, setExpanded] = createSignal(false);
    const [reflectData, setReflectData] = createStore<ReflectData>({
        goalId: props.goal.id
    });

    createEffect(() => {
        if(props.finished) {
            setExpanded(false);
        }  
    });

    return <div class="bg-gaze-700/50 my-4 rounded-md px-4 py-4">
        <button type="button" class="rounded border border-white/10 px-3 py-2 text-calm-200 shadow-md bg-gaze-700 hover:bg-gaze-600 transition-colors font-bold flex gap-2 text-left items-center w-full" 
        classList={{ "text-calm-400/50": props.finished }}
        onClick={() => {
            if(props.finished) {
                return;
            }
            setExpanded(!expanded())
            if (typeof props.onExpandChanged !== 'undefined') {
                props.onExpandChanged(expanded());
            }
        }}>
            <Show when={props.finished}>
                <EvaIcon class="fill-green-300 w-5" name="checkmark-circle-outline" />
            </Show>
            <Show when={!props.finished}>
                <div classList={{ "rotate-90 transition-transform": expanded() }} >
                    <EvaIcon class="fill-calm-300 w-5" name="arrow-circle-right-outline" />
                </div>
            </Show>
            { props.goal.description }
        </button>
        <Show when={expanded()}>
            <form onSubmit={
                (e) => {
                    e.preventDefault();
                    props.onSubmit(reflectData);
                }
            }>
                <h2 class="font-bold mt-4 text-sm text-gaze-400 relative left-0.5">How happy are you with your progress on this goal?</h2>
                <div class="mb-4"><RatingSlider onValueChange={(v) => setReflectData({rating: Math.round(v)})} /></div>
                <TextareaInput onChange={(v) => setReflectData({ barriersReflection: v})} label="What prevented you from working towards this goal? What do you want to focus on?" />
                <h2 class="font-bold mt-4 text-sm text-calm-400"></h2>
                <TextareaInput onChange={(v) => setReflectData({ successReflection: v})} label="What went well? What helped you pursue this goal?" />
                <div class="flex gap-2">
                    <div class="mb-1 mt-4"><ButtonPrimary submit>Save and Continue</ButtonPrimary></div>
                    <div class="mb-1 mt-4"><Button onClick={props.onSkip}>Skip</Button></div>
                </div>
            </form>
        </Show>
    </div >
}
