import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
    return new ImageResponse(
        <div
            style={{
                width: 32,
                height: 32,
                background: "#1a1b1e",
                border: "1px solid rgba(142, 173, 200, 0.22)",
                borderRadius: 6,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 13,
                fontWeight: 700,
                color: "#8eadc8",
                letterSpacing: "-0.5px",
            }}
        >
            SI
        </div>,
        { ...size },
    );
}
