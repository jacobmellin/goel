import Button from "./Button";

interface InfoModalProps {
    children: any,
    visible?: true
}

export default function InfoModal(props: InfoModalProps) {
    return <div class="fixed z-10 left-0 bottom-8 w-full flex items-center justify-items-center">
        <div class="mx-8 bg-soothe-700 border-white/10 border shadow-lg w-full rounded p-1 text-soothe-400 flex">
            <div class="flex-1 px-1">{props.children}</div>
            <div class="flex gap-1">
                <Button small>Dismiss</Button>
            </div>
        </div>
    </div>;
}
