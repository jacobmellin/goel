import ButtonPrimary from "../components/ButtonPrimary";
import Button from "../components/Button";
import TextareaInput from "../components/TextareaInput";
import RatingSlider from "../components/RatingSlider";

export default function TrackProgressView() {
    return <div class="mt-4">
        <h1 class="font-bold text-lg text-soothe-400">Track Goal Progress (1/3)</h1>
        <p class="text-sm text-calm-400">Please reflect on your progress with the following goals:</p>
        <div class="bg-gaze-700/50 my-4 rounded-md px-4 py-4">
            <div class="rounded border border-white/10 px-3 py-2 text-calm-200 shadow-md bg-gaze-700 font-bold">Build a complete application with Svelte for learning.</div>
            <h2 class="font-bold mt-4 text-sm text-gaze-400 relative left-0.5">How happy are you with your progress on this goal?</h2>
            <div class="mb-4"><RatingSlider /></div>
            <TextareaInput label="What prevented you from working towards this goal?"></TextareaInput>
            <h2 class="font-bold mt-4 text-sm text-calm-400"></h2>
            <TextareaInput label="What went well? What helped you pursue this goal?"></TextareaInput>
            <div class="flex gap-2">
                <div class="mb-1 mt-4"><ButtonPrimary submit>Save and Continue</ButtonPrimary></div>
                <div class="mb-1 mt-4"><Button>Skip</Button></div>
            </div>
        </div>
    </div>;
}
