import { useTranslation } from "react-i18next";

type DemoEmbedProps = {
  title: string;
  iframeSrc: string;
  onBack: () => void;
};

export default function DemoEmbed({ title, iframeSrc, onBack }: DemoEmbedProps) {
  const { t } = useTranslation();

  return (
    <div className="demo-embed-layout">
      <div className="demo-header-bar">
        <button type="button" className="demo-back-btn" onClick={onBack}>
          {t("demo.back")}
        </button>
        <span className="product-badge" style={{ margin: 0 }}>
          {t("demo.badge")}
        </span>
      </div>
      <h1 className="demo-embed-title">{title}</h1>
      <p className="demo-embed-hint">{t("demo.embedHint")}</p>
      <iframe
        className="demo-embed-frame"
        src={iframeSrc}
        title={title}
        allow="camera; microphone; fullscreen"
      />
    </div>
  );
}
