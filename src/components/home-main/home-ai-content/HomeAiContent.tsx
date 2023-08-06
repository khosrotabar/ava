import { homeAiContentProps } from "@/shared/types";
import HomeAiUpload from "./home-ai-upload/HomeAiUpload";
import HomeAiLink from "./home-ai-link/HomeAiLink";
import HomeAiRecord from "./home-ai-record/HomeAiRecord";

const HomeAiContent = ({ activetab }: homeAiContentProps) => {
  return (
    // ai content with change form content styles
    <div
      className={
        activetab === 1
          ? "home-bottom-form-content active-record-border add-home-bottom-form-content"
          : activetab === 2
          ? "home-bottom-form-content active-archive-border"
          : activetab === 3
          ? "home-bottom-form-content active-link-border"
          : ""
      }
    >
      {activetab === 1 ? (
        <HomeAiRecord />
      ) : activetab === 2 ? (
        <HomeAiUpload />
      ) : activetab === 3 ? (
        <HomeAiLink />
      ) : undefined}
    </div>
  );
};

export default HomeAiContent;
