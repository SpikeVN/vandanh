import "./styles/MenuButton1.css";

export default function MenuButton1(
    props: { children: string; onClick?: () => void } = {
        children: "BUTTON",
        onClick: () => {},
    },
) {
    return (
        <button
            id="hover-button"
            class="relative cursor-pointer"
            onClick={props.onClick}
        >
            <svg
                style={{
                    width: "400px",
                    "margin-top": "-0.5rem",
                    "margin-bottom": "-0.5rem",
                }}
                width="560"
                height="96"
                viewBox="0 0 560 96"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M471.5 5.5V71.7646L453.748 86.5H27.5V5.5H471.5Z"
                    // fill="var(--color-fg)"
                    stroke="#BECDD0"
                    id="hover-button-bg"
                />
                <line
                    x1="454"
                    y1="92.5001"
                    x2="-4.37114e-08"
                    y2="92.5"
                    stroke="#BECDD0"
                />
                <path d="M0 96V92H99L88 96H0Z" fill="#BECDD0" />
                <line x1="250" y1="0.5" x2="51" y2="0.5" stroke="#324041" />
                <path
                    d="M428 30L424 35L431.5 41.5V50L424.5 57.5L429.5 62.5L438 53V39L428 30Z"
                    id="button-chevron"
                />
                <g clip-path="url(#clip0_3_120)">
                    <path
                        d="M546.02 124H531.884L514 106.116V91.9805L546.02 124ZM578.648 124H562.594L514 75.4062V59.3516L578.648 124ZM609.358 124H595.222L514 42.7773V28.6416L609.358 124ZM631.08 115.012V124H625.933L514 12.0674V5H521.068L631.08 115.012ZM631.08 84.3018V98.4385L537.641 5H551.777L631.08 84.3018ZM631.08 51.6729V67.7285L568.352 5H584.406L631.08 51.6729ZM631.08 20.9639V35.0996L600.98 5H615.116L631.08 20.9639Z"
                        id="button-pattern"
                    />
                </g>
                <defs>
                    <clipPath id="clip0_3_120">
                        <rect
                            width="46"
                            height="82"
                            fill="white"
                            transform="translate(514 5)"
                        />
                    </clipPath>
                </defs>
            </svg>

            <p
                style={{
                    position: "absolute",
                    right: "8rem",
                    top: "1.5rem",
                }}
                class="text-2xl font-semibold"
            >
                {props.children}
            </p>
        </button>
    );
}
