import Goal from "./Goal";

export default function GoalsView() {
    return <div class="grid md:grid-cols-3 sm:grid-cols-2 gap-6 mt-10">
        <Goal trackingInterval="daily" text="This is an example goal" />
        <Goal trackingInterval="monthly" text="This is an example goal" />
        <Goal trackingInterval="weekly" text="This is an example goal" />
        <Goal trackingInterval="weekly" text="This is an example goal with a longer text that has a linebreak." />
    </div>;
}
