import { JSXElement, createEffect } from "solid-js";

interface ModalProps {
    allowBgClose?: boolean,
    visible?: boolean,
    title: string,
    children?: JSXElement,
}

export default function Modal(props: ModalProps) {
    let modalRef: HTMLDialogElement;
    
    createEffect(() => {
        if(props.visible) {
            modalRef.querySelector('input')?.focus();
            modalRef.showModal();
        } else {
            modalRef.close();
        }
    });

    return <dialog ref={modalRef!} classList={{hidden:!props.visible}} class="flex px-4 flex-col justify-center overflow-visible items-center backdrop:backdrop-blur-lg bg-transparent select-none cursor-default">
        <div class="p-6 bg-gaze-900/90 rounded-lg w-full max-w-xl shadow-lg border border-white/10">
            <h2 class="font-bold text-lg text-orange-200">{props.title}</h2>
            <div>
            {props.children}
            </div>
        </div>
    </dialog>;
}
