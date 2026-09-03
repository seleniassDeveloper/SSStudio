"use client";

import Image from "next/image";

export function HeroGraphic() {
  return (
    <div
      style={{
        position: "relative",
        borderRadius: "20px",
        overflow: "hidden",
        border: "1px solid var(--border)",
        boxShadow: "0 20px 50px rgba(108, 92, 231, 0.12)",
        maxWidth: "580px",
        width: "100%",
        background: "var(--surface)",
      }}
    >
      <Image
        src="/ssstudio_hero_dashboard.png"
        alt="SSSTUDIO AI Consulting & Software Engineering Platform Dashboard"
        width={1100}
        height={730}
        priority
        sizes="(max-width: 768px) 100vw, 580px"
        style={{ width: "100%", height: "auto", display: "block" }}
      />
    </div>
  );
}
