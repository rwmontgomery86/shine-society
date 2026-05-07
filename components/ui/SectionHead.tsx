type Props = {
  num: string;
  kicker: string;
  title: string;
  align?: "left" | "center";
};

export function SectionHead({ num, kicker, title, align }: Props) {
  return (
    <header className={"ss-sechead " + (align === "center" ? "is-center" : "")}>
      <div className="ss-sechead__num">
        <span>{num}</span>
        <i />
      </div>
      <div className="ss-sechead__text">
        <span className="ss-sechead__kicker">{kicker}</span>
        <h2 className="ss-sechead__title">{title}</h2>
      </div>
    </header>
  );
}
