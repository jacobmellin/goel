interface RatingSliderProps {
    onValueHoverChange?: (value: number) => void,
    onValueChange?: (value: number) => void
}

const sliderIntervals = [
   { start: 0, text: "Unhappy" },
   { start: 30, text: "Neutral" },
   { start: 75, text: "Happy" },
   { start: 90, text: "Very Happy"}
];

export default function RatingSlider(props: RatingSliderProps) {
    return <div class="h-5 mt-1 border-white/10 border rounded shadow-inner bg-gaze-800">
        <div>
        </div>
    </div>;
}
