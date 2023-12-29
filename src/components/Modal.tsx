interface ModalProps {
   allowBgClose: boolean,
   visible: boolean,
   title: string
}

export default function Modal(props: ModalProps) {
    return <div class="flex px-4 flex-col justify-center items-center absolute pt-24 top-1 left-1 bottom-1 right-1 rounded-2xl backdrop-blur-lg bg-slate-900/10">
       <div class="p-4 bg-gaze-900 rounded-lg w-full max-w-xl shadow-lg border border-white/10">
       <h2 class="font-bold text-md text-soothe-400">Modal title</h2>
       </div>
    </div>;
}
