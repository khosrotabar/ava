import { useState, useRef, useEffect } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { Tooltip, ClickAwayListener } from "@mui/material";
import { toast } from "react-toastify";

import { aiFileProps, text } from "@/shared/types";
import AiFileBottom from "./ai-file-bottom/AiFileBottom";
import { archiveTools } from "@/utilities/archive-tools/archive-tools";
import {
  copyToClipboard,
  downloadHandler,
  formatDurationTextTime,
  tooltipCloseHandler,
  tooltipOpenHandler,
  convertDatetimeToDate,
  convertSecond,
} from "@/helpers/archive-ai-files-functions";
import { deleteApi, getFileApi } from "@/api/AsyncAPI";

const AiFile = ({ item, files, setFiles, onItemClick }: aiFileProps) => {
  const [paused, setPaused] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const aiFileRef = useRef<HTMLDivElement | null>(null);
  const aiBottomRef = useRef<HTMLDivElement | null>(null);
  const aiToolsRef = useRef<HTMLDivElement | null>(null);
  const [sendType, setSendType] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string>("");
  const [audioType, setAudioType] = useState<string | null>(null);
  const [audioName, setAudioName] = useState<string | null>(null);
  const [audioLang, setAudioLang] = useState<string | null>(null);
  const [formattedText, setFormattedText] = useState<string>("");
  const [isFetch, setIsFetch] = useState<boolean>(false);
  const [text, setText] = useState<text[]>([
    { start: "0:00:00", end: "0:00:00", text: "" },
  ]);
  const notify = (value: string) => toast.error(value);
  const notifyCopy = (value: string) => toast.info(value);

  // convert text array to one single string - copy text
  useEffect(() => {
    let formatted_text = "";
    text.map((t) => {
      formatted_text += `${t.text} `;
    });
    setFormattedText(formatted_text);
  }, [text]);

  // copy texts handler
  const copyHandler = () => {
    if (item.isActive) {
      copyToClipboard(formattedText), tooltipOpenHandler({ setOpen });
    } else {
      notifyCopy("ابتدا فایل را انتخاب کنید");
    }
  };

  // change ai file height - file click event except on ref element inside file
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

        // run get file api
        const itemId = item.id;
        !item.isActive &&
          getFileApi({
            itemId,
            setText,
            setIsFetch,
            notify,
          });

        !item.isActive && setIsFetch(false);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.id, onItemClick, item.isActive]);

  // work on api list results - name/duration/type and etc
  useEffect(() => {
    // audio url - string
    const media_url = item.request_data.media_url;
    // audio urls - array of string
    const media_urls = item.request_data.media_urls;

    setAudioLang(item.request_data.language);

    if (media_url) {
      // get audio type (forexample .mp3) from api
      setAudioType(media_url.split(".").pop() || null);

      setAudioUrl(media_url);

      // get file name from url handler
      const getFileName = (url: string, reqType: string): string => {
        let fileName =
          url
            .split("/")
            .slice(-1)[0]
            .split(".")[0]
            .split("-")
            .pop()
            ?.split(reqType)
            .pop() || "";
        fileName = fileName.replace(/_/g, " ");
        return fileName;
      };

      if (media_url.includes("uploadType")) {
        // get audio request type
        setSendType("Upload");

        setAudioName(getFileName(media_url, "uploadType_"));
      }
      if (media_url.includes("recordType")) {
        // get audio request type
        setSendType("Record");

        setAudioName(getFileName(media_url, "recordType_"));
      }
    }

    if (media_urls && Array.isArray(media_urls)) {
      // get audio type (ext .mp3) from api
      setAudioType(media_urls[0].split(".").pop() || null);
      // get audio request type
      setSendType("Link");

      setAudioUrl(media_urls[0]);

      setAudioName(media_urls[0]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  // run delete file api
  const deleteFileHandler = (itemId: number) => {
    deleteApi({
      notify,
      itemId,
      files,
      setFiles,
      audioRef,
      item,
    });
  };

  return (
    <div
      className={`ai-file ${
        item.isActive && `change-ai-file-${sendType?.toLowerCase()}`
      }`}
      ref={aiFileRef}>
      {/* dummy voice */}
      <audio
        preload='none'
        ref={audioRef}
        style={{ display: "none" }} // for challenge - 1
        onContextMenu={() => false}
        onEnded={() => setPaused(true)}
        hidden
        src={audioUrl}></audio>
      {/* seperate from dummy voice */}
      <div className='ai-file-top'>
        {/* file icon */}
        <div className='ai-file-icon'>
          <div
            className={`icon ${sendType === "Link" && "link"} ${
              sendType === "Upload" && "upload"
            } ${sendType === "Record" && "record"}`}>
            {sendType === "Link"
              ? archiveTools.linkSvg
              : sendType === "Upload"
              ? archiveTools.uploadSvg
              : sendType === "Record"
              ? archiveTools.micSvg
              : ""}
          </div>
        </div>
        {/* file name - link -> blue color */}
        <span className={`ai-file-name ${sendType === "Link" && "link-name"}`}>
          {audioName}
        </span>
        <span className='ai-file-date'>{convertDatetimeToDate(item.date)}</span>
        <span className='ai-file-type'>.{audioType}</span>
        {/* file duration - format seconds to real time */}
        <span className='ai-file-duration'>
          {formatDurationTextTime(item.duration)}
        </span>
        <div className='ai-file-tools' ref={aiToolsRef}>
          {/* file download voice */}
          <div
            data-tooltip-id='my-tooltip'
            className='ai-file-aownload'
            onClick={() => downloadHandler({ audioUrl })}>
            {archiveTools.downloadSvg}
          </div>
          {/* file download word - challenge 3 */}
          <div className='ai-file-word'>{archiveTools.wordSvg}</div>
          {/* mui tooltip for copy text - close handler - tooltip container */}
          <ClickAwayListener
            onClickAway={() => tooltipCloseHandler({ setOpen })}>
            {/* file copy text */}
            <div className='ai-file-copy' onClick={copyHandler}>
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
                    }}>
                    copied
                  </p>
                }
                placement='bottom'
                className='copy-tooltip'>
                {archiveTools.copySvg}
              </Tooltip>
            </div>
          </ClickAwayListener>
          {/* file delete */}
          <div
            className='ai-file-delete'
            onClick={() => deleteFileHandler(item.id)}>
            {archiveTools.deleteSvg}
          </div>
        </div>
      </div>
      {/* file content - ai output for file */}
      <div className='ai-file-bottom' ref={aiBottomRef}>
        {!isFetch
          ? archiveTools.previewTexts
          : item.isActive && (
              <AiFileBottom
                setPaused={setPaused}
                paused={paused}
                audioRef={audioRef && audioRef}
                text={text}
                currentTab={sendType ? sendType : ""}
                lang={audioLang ? audioLang : ""}
                duration={convertSecond(item.duration)}
              />
            )}
      </div>
      {/* main tooltip for file size - seperate npm package -> just hover */}
      <ReactTooltip
        noArrow
        id='my-tooltip'
        place='bottom-end'
        content={`${20} مگابایت`} // temporary
        className='tooltip'
      />
    </div>
  );
};

export default AiFile;
