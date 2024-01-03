import TextareaInput from "./TextareaInput"
import RatingSlider from "./RatingSlider"
import Button from "./Button"
import ButtonPrimary from "./ButtonPrimary"
import EvaIcon from "./EvaIcon"
import { Show, createSignal } from "solid-js"

interface GoalReflectFormProps {
    onExpandChanged?: (isExpanded: boolean) => void
}

export default function GoalReflectForm(props: GoalReflectFormProps) {
    const [expanded, setExpanded] = createSignal(false);
    return <div class="bg-gaze-700/50 my-4 rounded-md px-4 py-4">
        <button type="button" class="rounded border border-white/10 px-3 py-2 text-calm-200 shadow-md bg-gaze-700 hover:bg-gaze-600 transition-colors font-bold flex gap-2 items-center w-full" onClick={() => {
            setExpanded(!expanded())
            if(typeof props.onExpandChanged !== 'undefined') {
                props.onExpandChanged(expanded());
            }
        }}><div classList={{"rotate-90 transition-transform": expanded()}} ><EvaIcon  class="fill-calm-300 w-5" name="arrow-circle-right-outline"
        /></div> Build a complete application with Svelte for learning.</button>
        <Show when={expanded()}>
            <div>
                <h2 class="font-bold mt-4 text-sm text-gaze-400 relative left-0.5">How happy are you with your progress on this goal?</h2>
                <div class="mb-4"><RatingSlider /></div>
                <TextareaInput label="What prevented you from working towards this goal? What do you want to focus on?"></TextareaInput>
                <h2 class="font-bold mt-4 text-sm text-calm-400"></h2>
                <TextareaInput label="What went well? What helped you pursue this goal?"></TextareaInput>
                <div class="flex gap-2">
                    <div class="mb-1 mt-4"><ButtonPrimary submit>Save and Continue</ButtonPrimary></div>
                    <div class="mb-1 mt-4"><Button>Skip</Button></div>
                    </div>
                </div>
        </Show>
    </div>
}
