import "./styles/BasicButton.css";

export default function BasicButton(props: any) {
    return (
        <button
            class={`basicbutton clipped-border px-6 py-4 ${props.class || ""}`}
            style={{
                "clip-path":
                    "polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%)",
            }}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
}
