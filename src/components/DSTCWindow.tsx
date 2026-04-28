import {
    createSignal,
    createMemo,
    Switch,
    Match,
    onMount,
    For,
    createEffect,
} from "solid-js";
import DraggableWindow from "./winlib/DraggableWindow";
import "./styles/DSTCWindow.css";
import BasicButton from "./winlib/BasicButton";
import Tooltip from "./winlib/Tooltip";
import { userdata } from "../engine/userdata";
import { gotoLine, sceneAt } from "../engine/script";
import userFrame from "../../assets/images/userframe.svg";
import star from "../../assets/images/star.svg";
import gsap from "gsap";

export default function DSTCWindow() {
    let [ww, setww] = createSignal(936);
    let [wh, setwh] = createSignal(500);
    let windowApi: any;
    let contentRef!: HTMLDivElement;

    // Track the current scene to handle transitions
    const currentScene = () => sceneAt(2);
    const [renderedScene, setRenderedScene] = createSignal(currentScene());
    const [isTransitioning, setIsTransitioning] = createSignal(false);

    createEffect(() => {
        const nextScene = currentScene();
        if (nextScene !== renderedScene() && !isTransitioning()) {
            setIsTransitioning(true);
            // Fade out
            gsap.to(contentRef, {
                opacity: 0,
                y: -10,
                duration: 0.2,
                ease: "power2.in",
                onComplete: () => {
                    setRenderedScene(nextScene);
                    // Fade in
                    gsap.fromTo(
                        contentRef,
                        { opacity: 0, y: 10 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.3,
                            ease: "power2.out",
                            onComplete: () => setIsTransitioning(false),
                        },
                    );
                },
            });
        }
    });

    // Make path and viewbox reactive using createMemo
    let path = createMemo(
        () => `
        M 0 0
        L 373 0
        L 400 28
        H ${ww() - 197}
        L ${ww() - 176} 0
        H ${ww() - 67}
        L ${ww()} 66
        V ${wh()}
        H 177
        L 142 ${wh() - 30}
        H 35
        L 0 ${wh() - 67}
        Z
    `,
    );

    let viewbox = createMemo(() => `0 0 ${ww()} ${wh()}`);

    return (
        <DraggableWindow
            id="dstc-dashboard"
            title="DSTC 2026 - Dashboard thí sinh"
            apiRef={(api) => (windowApi = api)}
            draggableMode="anywhere"
            initialWidth={ww}
            initialHeight={wh}
            onWidthChange={setww}
            onHeightChange={setwh}
            minWidth={842}
            minHeight={100}
            initialY={25}
        >
            <div class="w-full h-full">
                <div class="absolute decor w-full h-full">
                    <svg
                        viewBox={viewbox()}
                        preserveAspectRatio="none"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style="width: 100%; height: 100%;"
                    >
                        <path
                            d={path()}
                            stroke="var(--color-fg)"
                            fill="var(--color-bg)"
                            stroke-width="1.5px"
                        />
                    </svg>
                </div>
                <div class="absolute w-full">
                    <div
                        class="absolute top-0 left-0 flex flex-row items-center bg-fg text-bg font-semibold"
                        style={{
                            width: "401px",
                            height: "29px",
                            "padding-left": "28px",
                            "clip-path":
                                "polygon(0 0, 375px 0, 100% 100%, 0% 100%, 0 0)",
                        }}
                    >
                        DSTC 2026 - Dashboard thí sinh
                    </div>
                    <div class="absolute top-0 right-[30px] px-[56px] py-[7px] flex flex-row items-center justify-center text-sm text-green-500">
                        Connected
                    </div>
                </div>
                <div
                    style={{ height: "calc(100% - 29px)" }}
                    class="absolute w-full top-[29px] left-0"
                    ref={contentRef}
                >
                    <Switch fallback={<div class="h-full w-full">
                                <DSTCMatchFound windowApi={windowApi} />
                            </div>}>
                        <Match when={renderedScene() === "menu"}>
                            <div class="h-full w-full">
                                <DSTCRegistration />
                            </div>
                        </Match>
                        <Match when={renderedScene() === "findingmatch"}>
                            <div class="h-full w-full">
                                <DSTCFindingMatch />
                            </div>
                        </Match>
                    </Switch>
                </div>
            </div>
        </DraggableWindow>
    );
}

function formatSeconds(totalSeconds: number): string {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const h = String(hours).padStart(2, "0");
    const m = String(minutes).padStart(2, "0");
    const s = String(seconds).padStart(2, "0");

    return `${h}:${m}:${s}`;
}

function DSTCRegistration() {
    let hours = new Date().getHours();
    let [timeLeft, setTimeLeft] = createSignal(120);

    let codeList = [
        "434C42204B48444C2054524F4E47204B54205641204B44",
        "746F2074656E206C612062616E67",
        "536F6261206E69206974616920796F0A",
        "48696D6177617269206E6F2059616B75736F6B75",
        "796F7572207265616C697479",
        "6973206974206C6F766520696620692074616B6520796F75",
        "656D20686F63206B74717420646920656D",
        "4B494E482054452051554F4320544520594555205448554F4E47",
        "69206D69737320796F75206D792073756E666C6F776572",
    ];

    let [code, setCode] = createSignal("");
    let lastCodeIndex = -1;

    const formatCodeIntoLines = (hexString: string): string => {
        const pairs = hexString.match(/.{1,2}/g) || [];
        const pairsPerLine = Math.ceil(pairs.length / 2);
        const lines: string[] = [];
        for (let i = 0; i < pairs.length; i += pairsPerLine) {
            lines.push(pairs.slice(i, i + pairsPerLine).join(" "));
        }
        return lines.join("\n");
    };

    const getCodeLines = (): string[] => {
        return code()
            .split("\n")
            .filter((line) => line.trim() !== "");
    };

    const getRandomCode = (): string => {
        let randomIndex: number;
        do {
            randomIndex = Math.floor(Math.random() * codeList.length);
        } while (randomIndex === lastCodeIndex);
        lastCodeIndex = randomIndex;
        return codeList[randomIndex];
    };

    onMount(() => {
        let countdownInterval = setInterval(() => {
            setTimeLeft((prev) => Math.max(0, prev - 1));
            if (timeLeft() === 0) {
                clearInterval(countdownInterval);
            }
        }, 1000);

        let codeInterval = setInterval(() => {
            const randomCode = getRandomCode();
            setCode(formatCodeIntoLines(randomCode));
        }, 500);

        const initialCode = getRandomCode();
        setCode(formatCodeIntoLines(initialCode));

        return () => {
            clearInterval(countdownInterval);
            clearInterval(codeInterval);
        };
    });

    return (
        <div class="w-full h-full flex flex-col">
            <div class="w-full py-2 px-6">
                Chào buổi {hours < 12 ? "sáng" : hours < 18 ? "chiều" : "tối"},{" "}
                {userdata.name}.
            </div>
            <div class="w-full py-2 px-6 border-t border-b border-fg2 flex flex-row items-center justify-between">
                <div>
                    Bạn vẫn chưa đăng ký lập team cho DSTC 2026. <br />
                    Thời gian đăng ký còn lại là:
                </div>

                <div class="text-4xl font-bold">
                    {formatSeconds(timeLeft())}
                </div>
            </div>
            <div class="relative w-full h-full flex flex-col">
                <div class="absolute font-ocr text-[14px] leading-4 text-fg2 top-4 left-6">
                    HTTPS / 20ms ping <br />
                    Connection stable, FLA 1.0x
                </div>

                <div class="absolute font-ocr text-[14px] leading-4 text-fg2 top-4 right-6 flex flex-col items-end">
                    <For each={getCodeLines()}>
                        {(line) => <div>{line}</div>}
                    </For>
                </div>

                <div class="w-full h-full p-4 flex flex-col items-end justify-between">
                    <div class="w-full h-full flex flex-row items-center justify-around">
                        <Tooltip
                            title="Lỗi"
                            content="Bạn không có bạn bè. Loser."
                        >
                            <BasicButton class="font-semibold">
                                MATCH BẠN BÈ
                            </BasicButton>
                        </Tooltip>
                        <BasicButton
                            class="font-semibold"
                            onClick={() => {
                                gotoLine("s1->findingmatch");
                                setTimeout(() => {
                                    gotoLine("s1->matchfound");
                                }, 3000);
                            }}
                        >
                            RANDOM MATCH
                        </BasicButton>
                    </div>
                    <div>
                        <p class="text-4xl font-semibold text-right">
                            Data Science Talent
                            <br />
                            Competition 2026
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function DSTCFindingMatch() {
    return (
        <div class="w-full h-full flex flex-col items-center justify-center gap-6">
            <p class="text-2xl font-semibold">Đang tìm kiếm đồng đội...</p>
            <div class="loader" />
        </div>
    );
}

function DSTCMatchFound(props: { windowApi: any }) {
    return (
        <div class="w-full h-full flex flex-col p-8">
            <p class="text-2xl font-bold text-[#becdd0] mb-8 text-center uppercase tracking-wider">
                Thông tin đồng đội
            </p>

            <div class="flex flex-row gap-12 items-start justify-center">
                <div class="flex flex-col items-center gap-4">
                    <div class="relative w-[165px] h-[195px]">
                        <img
                            src={userFrame}
                            alt="Avatar Frame"
                            class="absolute inset-0 w-full h-full"
                        />
                    </div>
                    <div class="bg-[#becdd0] flex flex-row gap-2 px-3 py-1 text-[#080d15] font-ocr text-sm">
                        <span>ID</span>
                        <span>42414E47</span>
                    </div>
                </div>

                <div class="flex flex-col gap-2 text-[#becdd0]">
                    <p class="text-4xl font-bold mb-2">@docaubiettolaai</p>

                    <div class="grid grid-cols-[180px_1fr] gap-y-1 text-xl">
                        <span class="font-bold">Đơn vị</span>
                        <span>Trường Đại học Ngoại Thương</span>

                        <span class="font-bold">Chuyên ngành</span>
                        <span>Khoa học máy tính</span>

                        <span class="font-bold">Sở trường</span>
                        <span>coding, xàm, a#RF</span>

                        <span class="font-bold">Mục tiêu</span>
                        <span>vô địch DSTC 2026</span>

                        <span class="font-bold">Đánh giá portfolio</span>
                        <div class="flex flex-row items-center gap-3">
                            <span>5.0</span>
                            <div class="flex flex-row gap-1">
                                <For each={[1, 2, 3, 4, 5]}>
                                    {() => (
                                        <img
                                            src={star}
                                            alt="Star"
                                            class="w-4 h-4"
                                        />
                                    )}
                                </For>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex justify-center mt-auto pb-4">
                <BasicButton
                    class="flex flex-row items-center gap-4 px-6"
                    onClick={() => {
                        gotoLine("s1->chat");
                        // if (props.windowApi) {
                        //     props.windowApi.moveTo(
                        //         50,
                        //         props.windowApi.getPosition().y,
                        //         {
                        //             duration: 0.5,
                        //             ease: "power2.inOut",
                        //         },
                        //     );
                        // }
                    }}
                >
                    <span class="text-xl font-semibold">Mở chat</span>
                </BasicButton>
            </div>
        </div>
    );
}
