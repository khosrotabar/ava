import { simpleTextProps } from "@/shared/types";

const SimpleText = ({ text, lang }: simpleTextProps) => {
  return (
    <div
      className={`simple-text-container ${
        lang === "EN" && "change-simple-text-container"
      }`}
    >
      <span className="simple-text">{text}</span>
    </div>
  );
};
export default SimpleText;
