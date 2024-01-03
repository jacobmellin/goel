import GoalReflectForm from "../components/GoalReflectForm";

export default function TrackProgressView() {
    return <div class="mt-4">
        <h1 class="font-bold text-lg text-soothe-400">Track Goal Progress (0/3)</h1>
        <p class="text-sm text-calm-400">Please reflect on your progress with the following goals:</p>
        <GoalReflectForm />
    </div>;
}
