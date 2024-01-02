import { Show } from "solid-js";
import Button from "./Button";
import { createStore } from "solid-js/store";

const displayDuration = 3000;

interface InfoBarData {
    visible: boolean,
    undoable: boolean,
    text: string,
    onUndoClicked?: Function
}

const [state, setState] = createStore<InfoBarData>({
    visible: false,
    undoable: false,
    text: "",
});

let infoBarTimeout: ReturnType<typeof setTimeout>;

export const useInfoBar = () => {
    return {
        showInfo(
            text: string,
            undoable?: boolean,
            onUndoClicked?: () => void) {
            setState({
                text,
                visible: true,
                undoable,
                onUndoClicked
            });

            clearTimeout(infoBarTimeout);
            infoBarTimeout = setTimeout(() =>
                setState({ visible: false }), displayDuration);
        },
        showError(text: string) {
            setState({
                text,
                visible: true,
            });

            clearTimeout(infoBarTimeout);
            infoBarTimeout = setTimeout(() =>
                setState({ visible: false }), displayDuration);
        }
    };
};


export const InfoBar = () => {
    return <div
        onMouseOver={() => {
            clearTimeout(infoBarTimeout)
        }}
        onMouseOut={() => {
            clearTimeout(infoBarTimeout);
            infoBarTimeout = setTimeout(() => 
                setState({
                    visible: false
            }), displayDuration)
        }}
        classList={{ hidden: !state.visible }}
        class="fixed z-10 left-0 bottom-8 w-full flex items-center justify-items-center">
        <div class="mx-8 bg-soothe-700 border-white/10 border shadow-lg w-full rounded p-1 text-soothe-400 flex">
            <div class="flex-1 px-1">{state.text}</div>
            <div class="flex gap-1">
                <Show when={state.undoable}>
                    <Button small onClick={() => {
                        state.onUndoClicked!();
                        setState({ visible: false });
                    }}>Undo</Button>
                </Show>
                <Button small onClick={() => {
                    setState({ visible: false });
                }}>Dismiss</Button>
            </div>
        </div>
    </div>;
}

