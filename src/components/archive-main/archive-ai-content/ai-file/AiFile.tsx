import { useState, useRef, useEffect } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { Tooltip, ClickAwayListener } from "@mui/material";

import { aiFileProps } from "@/shared/types";
import AiFileBottom from "./ai-file-bottom/AiFileBottom";
import {
  linkSvg,
  micSvg,
  uploadSvg,
  downloadSvg,
  wordSvg,
  copySvg,
  deleteSvg,
} from "@/utilities/archive-dummy-data/archive-dummy-data";
import {
  copyToClipboard,
  deleteHandler,
  downloadHandler,
  formatDuration,
  tooltipCloseHandler,
  tooltipOpenHandler,
} from "@/helpers/archive-ai-files-functions";

const AiFile = ({ item, files, setFiles, onItemClick }: aiFileProps) => {
  const [paused, setPaused] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const aiFileRef = useRef<HTMLDivElement | null>(null);
  const aiBottomRef = useRef<HTMLDivElement | null>(null);
  const aiToolsRef = useRef<HTMLDivElement | null>(null);

  // change ai file height - file click event except on ref inside file
  useEffect(() => {
    const aiFile = aiFileRef?.current;
    const handleClickOutside = (event: MouseEvent) => {
      if (
        aiBottomRef.current &&
        !aiBottomRef.current.contains(event.target as Node) &&
        aiToolsRef.current &&
        !aiToolsRef.current.contains(event.target as Node)
      ) {
        onItemClick(item.isActive ? -1 : item.id);
      }
    };
    if (!item.isActive) {
      setPaused(true);
      audioRef.current?.pause();
    }
    aiFile?.addEventListener("mousedown", handleClickOutside);

    return () => {
      aiFile?.removeEventListener("mousedown", handleClickOutside);
    };
  }, [item.id, onItemClick, item.isActive]);

  return (
    <div
      className={`ai-file ${item.isActive && "change-ai-file"}`}
      ref={aiFileRef}
      style={
        item.sendType === "record" && item.isActive
          ? { border: "1px solid #00ba9f" }
          : item.sendType === "link" && item.isActive
          ? { border: "1px solid #ff1654" }
          : item.sendType === "upload" && item.isActive
          ? { border: "1px solid #118ad3" }
          : {}
      }
    >
      {/* dummy voice */}
      <audio
        preload="none"
        ref={audioRef}
        style={{ display: "none" }} // for challenge - 1
        onContextMenu={() => false}
        onEnded={() => setPaused(true)}
        hidden
      >
        <source src={item.audio} type={`audio/${item.voiceType}`} />
      </audio>
      {/* seperate from dummy voice */}
      <div className="ai-file-top">
        {/* file icon */}
        <div className="ai-file-icon">
          <div
            className={`icon ${item.sendType === "link" && "link"} ${
              item.sendType === "upload" && "upload"
            } ${item.sendType === "record" && "record"}`}
          >
            {item.sendType === "link"
              ? linkSvg
              : item.sendType === "upload"
              ? uploadSvg
              : item.sendType === "record"
              ? micSvg
              : ""}
          </div>
        </div>
        {/* file name - link -> blue color */}
        <span
          className={`ai-file-name ${item.sendType === "link" && "link-name"}`}
        >
          {item.name}
        </span>
        <span className="ai-file-date">{item.createdAt}</span>
        <span className="ai-file-type">.{item.voiceType}</span>
        {/* file duration - format seconds to real time */}
        <span className="ai-file-duration">
          {formatDuration(item.duration)}
        </span>
        <div className="ai-file-tools" ref={aiToolsRef}>
          {/* file download voice */}
          <div
            data-tooltip-id="my-tooltip"
            className="ai-file-aownload"
            onClick={() => downloadHandler({ item })}
          >
            {downloadSvg}
          </div>
          {/* file download word - challenge 3 */}
          <div className="ai-file-word">{wordSvg}</div>
          {/* mui tooltip for copy text - close handler - tooltip container */}
          <ClickAwayListener
            onClickAway={() => tooltipCloseHandler({ setOpen })}
          >
            {/* file copy text */}
            <div
              className="ai-file-copy"
              onClick={() => {
                copyToClipboard(item.text), tooltipOpenHandler({ setOpen });
              }}
            >
              {/* tooltip for copy */}
              <Tooltip
                PopperProps={{
                  disablePortal: true,
                }}
                onClose={() => tooltipCloseHandler({ setOpen })}
                open={open}
                disableFocusListener
                disableHoverListener
                disableTouchListener
                title={
                  <p
                    style={{
                      padding: "0px",
                      lineHeight: "auto",
                      fontSize: "14px",
                    }}
                  >
                    copied
                  </p>
                }
                placement="bottom"
                className="copy-tooltip"
              >
                {copySvg}
              </Tooltip>
            </div>
          </ClickAwayListener>
          {/* file delete */}
          <div
            className="ai-file-delete"
            onClick={() =>
              deleteHandler({
                files,
                setFiles,
                audioRef,
                item,
              })
            }
          >
            {deleteSvg}
          </div>
        </div>
      </div>
      {/* file content - ai output for file */}
      <div className="ai-file-bottom" ref={aiBottomRef}>
        {item.isActive && (
          <AiFileBottom
            setPaused={setPaused}
            paused={paused}
            audioRef={audioRef && audioRef}
            text={item.text}
            timeText={item.timeText}
            currentTab={item.sendType}
            lang={item.lang}
          />
        )}
      </div>
      {/* main tooltip for file size - seperate npm package -> just hover */}
      <ReactTooltip
        noArrow
        id="my-tooltip"
        place="bottom-end"
        content={`${item.size} مگابایت`}
        className="tooltip"
      />
    </div>
  );
};

export default AiFile;
