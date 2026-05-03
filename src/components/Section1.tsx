import { Match, Switch } from "solid-js";
import { sceneAt } from "../engine/script";
import VisualNovelTextWindow from "./VisualNovelTextWindow";
import FullScreenNarrator from "./FullScreenNarrator";
import StandardWindow from "./winlib/StandardWindow";

export default function Section1() {
    return (
        <>
            <Switch>
                <Match when={sceneAt(1) == "blank"}>
                    <FullScreenNarrator />
                </Match>
                <Match when={sceneAt(1) == "leadin"}>
                    <TicketWindow />
                    <VisualNovelTextWindow />
                </Match>
            </Switch>
        </>
    );
}

function TicketWindow() {
    return (
        <StandardWindow
            title="Phòng chờ"
            initialWidth={425}
            initialHeight={500}
            draggableMode="anywhere"
            noPadding={true}
        >
            <div class="flex flex-col gap-5 font-display px-6">
                <div class="flex items-center gap-2 text-fg mt-1">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="shrink-0 cursor-pointer text-fg/70 hover:text-fg transition-colors"
                    >
                        <path d="m15 18-6-6 6-6" />
                    </svg>
                    <span class="text-[16px] font-normal text-fg/80">
                        Bạn đang trong phòng chờ
                    </span>
                </div>

                <div class="border border-fg2 bg-bg p-4.5 flex flex-col gap-2 relative overflow-hidden">
                    <div class="relative z-10 flex flex-col gap-1">
                        <h3 class="font-bold text-fg text-[16px]">
                            Kinh tế Quốc tế Tôi
                        </h3>
                        <div class="flex items-center gap-2 text-fg/80 text-[14px]">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="shrink-0"
                            >
                                <path d="M8 2v4" />
                                <path d="M16 2v4" />
                                <rect
                                    width="18"
                                    height="18"
                                    x="3"
                                    y="4"
                                    rx="2"
                                />
                                <path d="M3 10h18" />
                            </svg>
                            <span>19:00 - 23:00, 20 tháng 5 năm 2026</span>
                        </div>
                    </div>
                    {/* Background decorative image if available - using a placeholder pattern or keeping it clean */}
                    <div class="absolute right-[-10%] top-[-20%] w-32 h-32 bg-accent/5 rounded-full blur-2xl pointer-events-none"></div>
                </div>

                {/* Queue Info Section */}
                <div class="flex flex-col gap-5 items-center mt-2">
                    {/* Progress Bar Container */}
                    <div class="w-full h-[9px] bg-fg2 relative">
                        {/* Progress Bar Fill */}
                        <div
                            class="absolute left-0 top-0 h-full bg-accent shadow-[4px_0_0_0_#6F4AA9]"
                            style={{ width: "77%" }}
                        ></div>
                    </div>

                    {/* Stats */}
                    <div class="text-center flex flex-col items-center">
                        <p class="text-[14px] text-fg/80 font-bold uppercase tracking-tight">
                            Số người đứng trước bạn
                        </p>
                        <p class="text-[40px] text-accent font-bold leading-tight mt-1">
                            100
                        </p>
                    </div>

                    {/* Warning Note */}
                    <p class="text-[14px] text-fg/80 text-center leading-[1.4] max-w-[340px]">
                        <span class="font-bold">Chú ý:</span> Khi đến lượt,
                        chúng tôi sẽ đưa bạn sang trang mua vé. Bạn có tổng cộng
                        10 phút để hoàn tất việc mua hàng.
                    </p>

                    {/* Meta Info */}
                    <div class="flex flex-col items-center gap-0 mt-2">
                        <div class="text-[14px] text-fg/60 font-bold">
                            Queue ID:{" "}
                            <span class="font-normal">
                                aGltYXdhcmkgbm8geWFrdXNva3U=
                            </span>
                        </div>
                        <div class="text-[14px] text-fg/60 font-bold">
                            Cập nhật lần cuối:{" "}
                            <span class="font-normal">11:02:05</span>
                        </div>
                    </div>
                </div>
            </div>
        </StandardWindow>
    );
}
