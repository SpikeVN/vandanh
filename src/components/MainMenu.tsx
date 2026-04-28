import { onMount } from "solid-js";
import gsap from "gsap";
import logoImage from "../../assets/images/logo.png";

import ticketImage from "../../assets/images/ticket.svg";
import MenuButton1 from "./winlib/MenuButton1";
import { GameStage } from "..";

export default function MainMenu(props: {
    doneCallback: (_: GameStage) => void;
}) {
    let mainMenu!: HTMLDivElement;
    let ticketContainerA!: HTMLDivElement;
    let ticketContainerB!: HTMLDivElement;
    let ticketContainerC!: HTMLDivElement;
    const ticketHeight = 800;
    const ticketWidth = (ticketHeight / 885) * 334;

    onMount(() => {
        gsap.timeline().from(mainMenu, {
            autoAlpha: 0,
            duration: 1,
        });

        const numBoxes = 3;
        const totalHeight = ticketHeight * numBoxes;
        const wrap = gsap.utils.wrap(-ticketHeight, totalHeight - ticketHeight);
        const yheight = "+=" + totalHeight * -1;

        const containers = [
            { el: ticketContainerA, duration: 60, offset: 0 },
            { el: ticketContainerB, duration: 75, offset: ticketHeight * 0.33 },
            { el: ticketContainerC, duration: 50, offset: ticketHeight * 0.67 },
        ];

        containers.forEach(({ el, duration, offset }) => {
            const tickets = el.querySelectorAll<HTMLImageElement>(".ticket");

            gsap.set(tickets, {
                y: (i) => i * ticketHeight + offset,
            });

            const tl = gsap.timeline();
            tl.to(tickets, {
                duration,
                ease: "none",
                y: yheight,
                modifiers: {
                    y: gsap.utils.unitize(wrap),
                },
                repeat: -1,
            });
        });
    });

    return (
        <div
            ref={mainMenu}
            class="w-[100vw] h-[100vh] bg-bg flex flex-col gap-5 items-center justify-between"
        >
            <div class="flex flex-row h-full w-full items-center justify-between">
                <div class="flex flex-row w-full h-[90vh] items-center gap-5">
                    <div
                        ref={ticketContainerA}
                        class="relative overflow-hidden h-full"
                        style={{
                            width: `${ticketWidth}px`,
                        }}
                    >
                        <img
                            class="ticket absolute top-0 w-fit"
                            style={{
                                height: `${ticketHeight}px`,
                            }}
                            src={ticketImage}
                            alt="decorative ticket"
                        />
                        <img
                            class="ticket absolute top-0 w-fit"
                            style={{
                                height: `${ticketHeight}px`,
                            }}
                            src={ticketImage}
                            alt="decorative ticket"
                        />
                        <img
                            class="ticket absolute top-0 w-fit"
                            style={{
                                height: `${ticketHeight}px`,
                            }}
                            src={ticketImage}
                            alt="decorative ticket"
                        />
                    </div>
                    <div
                        ref={ticketContainerB}
                        class={`relative overflow-hidden h-full`}
                        style={{
                            width: `${ticketWidth}px`,
                        }}
                    >
                        <img
                            class="ticket absolute top-0 w-fit"
                            style={{
                                height: `${ticketHeight}px`,
                            }}
                            src={ticketImage}
                            alt="decorative ticket"
                        />
                        <img
                            class="ticket absolute top-0 w-fit"
                            style={{
                                height: `${ticketHeight}px`,
                            }}
                            src={ticketImage}
                            alt="decorative ticket"
                        />
                        <img
                            class="ticket absolute top-0 w-fit"
                            style={{
                                height: `${ticketHeight}px`,
                            }}
                            src={ticketImage}
                            alt="decorative ticket"
                        />
                    </div>
                    <div
                        ref={ticketContainerC}
                        class={`relative overflow-hidden h-full`}
                        style={{
                            width: `${ticketWidth}px`,
                        }}
                    >
                        <img
                            class="ticket absolute top-0 w-fit"
                            style={{
                                height: `${ticketHeight}px`,
                            }}
                            src={ticketImage}
                            alt="decorative ticket"
                        />
                        <img
                            class="ticket absolute top-0 w-fit"
                            style={{
                                height: `${ticketHeight}px`,
                            }}
                            src={ticketImage}
                            alt="decorative ticket"
                        />
                        <img
                            class="ticket absolute top-0 w-fit"
                            style={{
                                height: `${ticketHeight}px`,
                            }}
                            src={ticketImage}
                            alt="decorative ticket"
                        />
                    </div>
                </div>

                <div class="flex flex-col pr-12 gap-10 items-center">
                    <img src={logoImage} alt="logo" class="w-[80%]" />
                    <div class="flex flex-col">
                        <MenuButton1
                            onClick={() => props.doneCallback(GameStage.PLAY)}
                        >
                            BẮT ĐẦU
                        </MenuButton1>
                        <MenuButton1
                            onClick={() => props.doneCallback(GameStage.SAVES)}
                        >
                            LƯU TRỮ
                        </MenuButton1>
                        <MenuButton1
                            onClick={() =>
                                props.doneCallback(GameStage.SETTINGS)
                            }
                        >
                            CÀI ĐẶT
                        </MenuButton1>
                        <MenuButton1
                            onClick={() =>
                                props.doneCallback(GameStage.CREDITS)
                            }
                        >
                            CREDITS
                        </MenuButton1>
                    </div>
                </div>
            </div>
            <p class="text-fg2 mb-4">
                Vấn Danh 0.0.1-ALPHA. Bản quyền © 2026 CLB Khoa học Công nghệ
                trong Kinh tế và Kinh doanh. Phát hành theo giấy phép GPLv3.
            </p>
        </div>
    );
}
