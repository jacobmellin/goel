import * as eva from "eva-icons";
import { createSignal, onMount } from "solid-js";

const SIZE = {
    SMALL: "12px",
    MEDIUM: "18px",
    LARGE: "24px",
    XLARGE: "30px",
};

interface EvaIconProps {
    fill?: string,
    animation?: Object,
    size?: string,
    name: string,
    class?: string
}

export default function EvaIcon(props: EvaIconProps) {
    const [dims, setDims] = createSignal("");

    const { fill, animation, size } = props;

    const updateDims = (size: string) => {
        switch (size) {
            case "small":
                return SIZE.SMALL;
            case "medium":
                return SIZE.MEDIUM;
            case "large":
                return SIZE.LARGE;
            case "xlarge":
                return SIZE.XLARGE;
            default:
                return SIZE.MEDIUM;
        }
    }

    setDims(updateDims(size));

    const config = {
        fill,
        width: dims,
        height: dims,
        animation,
    };

    onMount(() => {
        eva.replace(config);
    });

    return <i
        class={props.class}
        data-eva={props.name}
        data-eva-fill={props.fill}
        data-eva-height={dims}
        data-eva-width={dims}
    />
}
