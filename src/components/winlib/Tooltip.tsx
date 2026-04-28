import { createSignal, createMemo, JSX, Accessor } from "solid-js";
import "./styles/Tooltip.css";

interface TooltipProps {
    title: string;
    content: string;
    children: any;
    position?: "top" | "bottom" | "left" | "right";
    delay?: number;
}

export default function Tooltip(props: TooltipProps) {
    const [isVisible, setIsVisible] = createSignal(false);
    const [mouseX, setMouseX] = createSignal(0);
    const [mouseY, setMouseY] = createSignal(0);
    const delay = () => props.delay || 200;
    const position = () => props.position || "bottom";
    let timeoutId: number | undefined;
    let wrapperRef: HTMLDivElement | undefined;

    const handleMouseEnter = () => {
        timeoutId = setTimeout(() => {
            setIsVisible(true);
        }, delay()) as unknown as number;
    };

    const handleMouseLeave = () => {
        if (timeoutId !== undefined) {
            clearTimeout(timeoutId);
        }
        setIsVisible(false);
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!wrapperRef) return;
        const rect = wrapperRef.getBoundingClientRect();
        setMouseX(e.clientX - rect.left);
        setMouseY(e.clientY - rect.top);
    };

    // @ts-ignore
    const tooltipStyle: Accessor<JSX.CSSProperties> = createMemo(() => {
        return {
            position: "absolute",
            left: `${mouseX()}px`,
            top: `${mouseY()}px`,
            "z-index": 999999,
            "pointer-events": "none",
        };
    });

    return (
        <div
            class="tooltip-wrapper"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            ref={wrapperRef}
        >
            {props.children}
            {isVisible() && (
                <div
                    class={`tooltip tooltip-${position()}`}
                    style={tooltipStyle()}
                >
                    <svg
                        class="point"
                        width="23"
                        height="23"
                        viewBox="0 0 23 23"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <line
                            x1="22.6464"
                            y1="22.3536"
                            x2="2.64645"
                            y2="2.35355"
                            stroke="var(--color-bg)"
                        />
                        <rect width="4" height="4" fill="var(--color-bg)" />
                    </svg>

                    <div class="tooltip-content">
                        <div class="tooltip-title">{props.title}</div>
                        <div class="tooltip-text">{props.content}</div>
                    </div>
                </div>
            )}
        </div>
    );
}
