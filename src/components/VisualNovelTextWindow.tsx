import {
    Component,
    createSignal,
    onCleanup,
    onMount,
    createEffect,
} from "solid-js";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { TextPlugin } from "gsap/TextPlugin";
import { invokeEvent, registerEvent } from "../engine/chatTrigger";
import DraggableWindow from "./winlib/DraggableWindow";

import "./styles/VisualNovelTextWindow.css";
import { EventName } from "..";
gsap.registerPlugin(TextPlugin, SplitText);

const CHAR_ANIMATION_DURATION = 0.05;

interface VisualNovelTextWindowProps {
    getNextText: () => [string, string] | [string, string, EventName] | [string, string, () => void] | null; // Returns null when no more text
    onDone?: () => void;
}

const VisualNovelTextWindow: Component<VisualNovelTextWindowProps> = (
    props,
) => {
    let textContainer: HTMLDivElement | undefined;
    let textElement: HTMLParagraphElement | undefined;

    const [currentText, setCurrentText] = createSignal<string | null>(null);
    const [isAnimating, setIsAnimating] = createSignal(false);
    const [isWaitingForInput, setIsWaitingForInput] = createSignal(false);
    const [characterName, setCharacterName] = createSignal("");

    let timeline: gsap.core.Timeline | null = null;
    let mouseDownTime = 0;

    const animateText = () => {
        if (!textElement || !currentText()) return;

        // Kill any existing timeline
        if (timeline) {
            timeline.kill();
        }

        // Reset the text element to be empty for animation
        textElement.textContent = "";
        setIsAnimating(true);

        // Small delay to ensure DOM update
        setTimeout(() => {
            if (!textElement) return;

            const text = currentText();
            if (!text) return;

            timeline = gsap.timeline({
                onComplete: () => {
                    setIsAnimating(false);
                    setIsWaitingForInput(true);
                },
            });

            // Type out text character by character using TextPlugin
            timeline.to(textElement, {
                duration: text.length * CHAR_ANIMATION_DURATION,
                text: text,
                ease: "none",
            });
        }, 10);
    };

    const loadNextText = () => {
        const nextText = props.getNextText();

        if (nextText === null) {
            // No more text
            setCurrentText(null);
            setIsWaitingForInput(false);
            props.onDone?.();
            return;
        }

        setCurrentText(nextText[1]);
        setCharacterName(nextText[0]);
        if (typeof nextText[2] === "string") {
            invokeEvent(nextText[2]);
        } else if (typeof nextText[2] === "function") {
            nextText[2]();
        }
        setIsWaitingForInput(false);
    };

    const handleAdvance = () => {
        if (isAnimating()) {
            // Skip to end of animation
            if (timeline) {
                timeline.progress(1);
            }
            setIsAnimating(false);
            setIsWaitingForInput(true);
        } else if (isWaitingForInput()) {
            // Load next text
            loadNextText();
        }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleAdvance();
        }
    };

    const handleMouseDown = (e: MouseEvent) => {
        mouseDownTime = Date.now();
    };

    const handleMouseUp = (e: MouseEvent) => {
        const duration = Date.now() - mouseDownTime;
        // Only trigger if it was a quick click (less than 150ms)
        // This prevents triggering when dragging the window
        if (duration < 150) {
            handleAdvance();
        }
    };

    onMount(() => {
        // Load first text
        loadNextText();

        // Add event listeners
        document.addEventListener("keydown", handleKeyDown);
        // Attach listeners to the text container
        if (textContainer) {
            textContainer.addEventListener("mousedown", handleMouseDown);
            textContainer.addEventListener("mouseup", handleMouseUp);
        }
    });

    createEffect(() => {
        // Trigger animation whenever currentText changes
        if (currentText()) {
            animateText();
        }
    });

    onCleanup(() => {
        document.removeEventListener("keydown", handleKeyDown);
        if (textContainer) {
            textContainer.removeEventListener("mousedown", handleMouseDown);
            textContainer.removeEventListener("mouseup", handleMouseUp);
        }
        if (timeline) {
            timeline.kill();
        }
    });

    return (
        <DraggableWindow
            draggableMode="anywhere"
            initialWidth={825}
            initialHeight={150}
            class="visualnovel-window"
            initialX={window.innerWidth / 2 - 412}
            initialY={window.innerHeight - 150 - 24}
            alwaysOnTop={true}
        >
            <div
                class="visualnovel-outer select-none"
                style={{
                    "user-select": "none",
                }}
            >
                <div class="visualnovel-title text-md font-semibold">{characterName()}</div>
                <div
                    ref={textContainer}
                    class="visualnovel-content cursor-pointer"
                >
                    <p
                        ref={textElement}
                        class="text-lg font-normal text-white text-left px-4 pt-4"
                        style={{
                            "word-wrap": "break-word",
                        }}
                    />
                </div>
            </div>
        </DraggableWindow>
    );
};

export default VisualNovelTextWindow;
