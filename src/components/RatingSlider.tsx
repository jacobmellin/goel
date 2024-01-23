import { createSignal, onMount } from "solid-js";

interface RatingSliderProps {
    onValueHoverChange?: (value: number) => void,
    onValueChange?: (value: number) => void,
    initialValue?: number
}

export default function RatingSlider(props: RatingSliderProps) {
    const [sliderValue, setSliderValue] = createSignal(props.initialValue || 50);
    const [sliderHoverValue, setSliderHoverValue] = createSignal(0);
    const [isSliderMouseDown, setIsSliderMouseDown] = createSignal(false);

    let sliderOuter : HTMLDivElement;

    onMount(() => {
        sliderOuter.addEventListener("mousemove", (ev) => {
            const left = sliderOuter.getBoundingClientRect().left;
            const progress = (ev.clientX - left) / 
                sliderOuter.clientWidth;

            setSliderHoverValue(progress*100);
            if(isSliderMouseDown()) {
                setSliderValue(progress*100);
            }
            
            if(typeof props.onValueHoverChange !== 'undefined') {
                props.onValueHoverChange(sliderHoverValue());
            }
        });

        sliderOuter.addEventListener("click", () => {
        setSliderValue(sliderHoverValue());
            if(typeof props.onValueChange !== 'undefined') {
                props.onValueChange(sliderValue());
            }
        });

        sliderOuter.addEventListener("mousedown", () => {
            setIsSliderMouseDown(true);
        });
        
        sliderOuter.addEventListener("mouseup", () => {
            setIsSliderMouseDown(false);
        });
    });

    const getSliderColor = () => {
        if(sliderValue() < 40) {
            return "bg-soothe-600";
        } else if (sliderValue() < 60) {
            return "bg-gaze-700";
        } else {
            return "bg-green-400/40";
        }
    }

    return <div ref={sliderOuter!} class="cursor-pointer h-7 mt-1 border-white/10 border rounded shadow-inner bg-gaze-800 overflow-hidden relative">
        <div class="absolute opacity-0 hover:opacity-100 h-full w-full transition-opacity z-20">
            <div style={"width:" + sliderHoverValue() + "%"} class="bg-calm-300/10 hover:opacity-100 h-full transition-colors absolute left-0 top-0 z-10">
            </div>
        </div>
        <div style={"width:" + sliderValue() + "%;"} class={`h-full w-[50%] absolute top-0 left-0 duration-500 ${getSliderColor()} transition-colors` 
        }></div> 
        <div class="h-full w-full tracking-wide absolute top-0 left-0 flex items-center justify-around text-calm-300">
            <div class="text-xs uppercase">Unhappy</div>
            <div class="text-xs uppercase">Neutral</div>
            <div class="text-xs uppercase">Happy</div>
        </div>
    </div>;
}
