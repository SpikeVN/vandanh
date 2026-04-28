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
import { invokeEvent } from "../engine/events";
import DraggableWindow from "./winlib/DraggableWindow";

import "./styles/VisualNovelTextWindow.css";
import {
    currentLine,
    getNextText,
    ScriptEntry,
    invokeCurrentTrigger,
} from "../engine/script";
gsap.registerPlugin(TextPlugin, SplitText);

const CHAR_ANIMATION_DURATION = 0.05;

type TextFormat =
    | "normal"
    | "bold"
    | "italic"
    | "bold-italic"
    | "strikethrough"
    | "monospace";

interface ParsedText {
    text: string;
    format: TextFormat;
}

const parseMarkdown = (text: string): ParsedText => {
    let format: TextFormat = "normal";
    let cleanText = text;

    // Check for bold-italic (*** or ___ or **_ combinations)
    if (
        (text.startsWith("***") && text.endsWith("***")) ||
        (text.startsWith("___") && text.endsWith("___"))
    ) {
        format = "bold-italic";
        cleanText = text.slice(3, -3);
    }
    // Check for bold (** or __)
    else if (
        (text.startsWith("**") && text.endsWith("**")) ||
        (text.startsWith("__") && text.endsWith("__"))
    ) {
        format = "bold";
        cleanText = text.slice(2, -2);
    }
    // Check for italic (* or _)
    else if (
        (text.startsWith("*") &&
            text.endsWith("*") &&
            !text.startsWith("**")) ||
        (text.startsWith("_") && text.endsWith("_") && !text.startsWith("__"))
    ) {
        format = "italic";
        cleanText = text.slice(1, -1);
    }
    // Check for strikethrough (~~)
    else if (text.startsWith("~~") && text.endsWith("~~")) {
        format = "strikethrough";
        cleanText = text.slice(2, -2);
    }
    // Check for monospace (`)
    else if (
        text.startsWith("`") &&
        text.endsWith("`") &&
        !text.startsWith("``")
    ) {
        format = "monospace";
        cleanText = text.slice(1, -1);
    }

    return { text: cleanText, format };
};

const VisualNovelTextWindow: Component = (props) => {
    let textContainer: HTMLDivElement | undefined;
    let textElement: HTMLParagraphElement | undefined;

    const [currentText, setCurrentText] = createSignal<string | null>(null);
    const [textFormat, setTextFormat] = createSignal<TextFormat>("normal");
    const [isAnimating, setIsAnimating] = createSignal(false);
    const [isWaitingForInput, setIsWaitingForInput] = createSignal(false);
    const [characterName, setCharacterName] = createSignal("");

    let timeline: gsap.core.Timeline | null = null;
    let mouseDownTime = 0;

    const animateText = () => {
        if (!textElement || currentText() === null) return;

        // Kill any existing timeline
        if (timeline) {
            timeline.kill();
        }

        // Reset the text element to be empty for animation
        textElement.textContent = "";

        if (currentText() === "") {
            setIsAnimating(false);
            setIsWaitingForInput(true);
            invokeCurrentTrigger();
            return;
        }

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
                    invokeCurrentTrigger();
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
        setIsWaitingForInput(false);
        const nextText = getNextText();

        if (nextText === null) {
            // No more text
            setCurrentText(null);
            setTextFormat("normal");
            return;
        }

        const parsed = parseMarkdown(nextText[2]);
        setCurrentText(parsed.text);
        setTextFormat(parsed.format);
        setCharacterName(nextText[1]);
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
        // Load initial state from the script engine without advancing
        const line = currentLine();
        if (line) {
            const parsed = parseMarkdown(line[2]);
            setCurrentText(parsed.text);
            setTextFormat(parsed.format);
            setCharacterName(line[1]);
        }

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
        if (currentText() !== null) {
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
                <div class="visualnovel-title text-md font-semibold">
                    {characterName()}
                </div>
                <div
                    ref={textContainer}
                    class="visualnovel-content cursor-pointer"
                >
                    <p
                        ref={textElement}
                        class={`text-lg font-normal text-white text-left px-4 pt-4 vn-text-${textFormat()}`}
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
function onDone() {
    throw new Error("Function not implemented.");
}
