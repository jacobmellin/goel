import ButtonPrimary from "./ButtonPrimary";
import Goal from "./Goal";

export default function GoalsView(props: any) {
    return <div class="mt-4">
        <div class="flex flex-row items-center justify-between">
            <h1 class="my-4 text-lg font-bold text-orange-200">My goals:</h1>
            <ButtonPrimary onClick={props.addGoalClicked}>Create New goal</ButtonPrimary>
        </div>
        <div class="grid md:grid-cols-3 sm:grid-cols-2 gap-4">
            <Goal trackingInterval="daily" text="This is an example goal" />
            <Goal trackingInterval="monthly" text="This is an example goal" />
            <Goal trackingInterval="weekly" text="This is an example goal" />
            <Goal trackingInterval="weekly" text="This is an example goal with a longer text that has a linebreak." />
        </div>
    </div>;
}
