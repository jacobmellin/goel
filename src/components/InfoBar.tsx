import { createSignal } from "solid-js";
import Button from "./Button";

const displayDuration = 3000;

export const createInfoBar = () => {
    const [infoBarVisible, setInfoBarVisible] = createSignal(false);
    const [isUndoable, setIsUndoable] = createSignal(false);
    const [infoBarText, setInfoBarText] = createSignal("");

    let infoBarTimeout : ReturnType<typeof setTimeout>;

    const showInfo = (text: string, undoable?: boolean, onUndoClicked?: () => void) => {
        setInfoBarVisible(true);
        setIsUndoable(undoable || false);
        setInfoBarText(text);
        clearTimeout(infoBarTimeout);
        infoBarTimeout = setTimeout(() => setInfoBarVisible(false), displayDuration);
    };

    const showError = (text: string) => {
        setInfoBarVisible(true);
        setInfoBarText(text);
        infoBarTimeout = setTimeout(() => setInfoBarVisible(false), displayDuration);
    };

    const InfoBar = () => {
        return <div
                    onMouseOver={() => clearTimeout(infoBarTimeout)}
                    onMouseOut={() => {
                        clearTimeout(infoBarTimeout);
                        infoBarTimeout = setTimeout(() => setInfoBarVisible(false), displayDuration)}}
                    classList={{ hidden: !infoBarVisible() }} 
                    class="fixed z-10 left-0 bottom-8 w-full flex items-center justify-items-center">
            <div class="mx-8 bg-soothe-700 border-white/10 border shadow-lg w-full rounded p-1 text-soothe-400 flex">
                <div class="flex-1 px-1">{infoBarText()}</div>
                <div class="flex gap-1">
                    <Button small onClick={() => setInfoBarVisible(false)}>Dismiss</Button>
                </div>
            </div>
        </div>;
    }

    return [InfoBar, showInfo, showError] as const;
}
