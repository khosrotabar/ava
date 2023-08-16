import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { StopCircleOutlined } from "@mui/icons-material";
import useWebSocket, { ReadyState } from "react-use-websocket";

import Loader from "@/components/loader/Loader";
import AiOutput from "@/components/ai-output/AiOutput";
import HomeLang from "@/components/home-main/home-lang/HomeLang";
import { text } from "@/shared/types";
import { recordMic } from "@/utilities/svg/svg";
import { recordApi } from "@/api/AsyncAPI";
import {
  handleStartRecording,
  handleStopRecording,
} from "@/helpers/home-record-functions";

const HomeAiRecord = () => {
  const [isFetch, setIsFetch] = useState<boolean>(false);
  const [startFetch, setStartFetch] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [langSelect, setLangSelect] = useState<string>("fa");
  const [paused, setPaused] = useState<boolean>(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [audioDuration, setAudioDuration] = useState<number>(0);
  const [audioUrl, setAudioUrl] = useState<string>("");
  const [file, setFile] = useState<Blob | undefined>(undefined);
  const [text, setText] = useState<text[]>([
    { start: "0:00:00", end: "0:00:00", text: "" },
  ]);
  const notify = (value: string) => toast.error(value);

  // websocket
  const options = {
    onOpen: () => {
      console.log("WebSocket connection opened");
    },
    onClose: () => {
      console.log("WebSocket connection closed");
    },
  };
  const url = "wss://harf.roshan-ai.ir/ws_api/transcribe_files/";
  const { readyState, sendJsonMessage, lastJsonMessage } = useWebSocket(
    url,
    options
  );

  // convert audio blob to arraybuffer
  function convertBlobToArrayBuffer(blob: Blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = () => {
        reject(new Error("Unable to convert blob to ArrayBuffer."));
      };

      reader.readAsArrayBuffer(blob);
    });
  }

  // get arraybuffer
  async function handleAudioBlob(blob: Blob) {
    try {
      const arrayBuffer = await convertBlobToArrayBuffer(blob);
      if (arrayBuffer) {
        console.log(arrayBuffer);
        sendJsonMessage(arrayBuffer);
      }
    } catch (error) {
      console.error(error);
    }
  }

  // run record api when file selected - record api
  useEffect(() => {
    if (file) {
      recordApi({
        setAudioDuration,
        setStartFetch,
        setIsFetch,
        setText,
        notify,
        langSelect,
        file,
      });

      // handle websocket
      if (readyState === ReadyState.OPEN) {
        handleAudioBlob(file);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  useEffect(() => {
    if (lastJsonMessage) {
      // Handle the response accordingly
      console.log("response:", lastJsonMessage);
    } else {
      console.log(lastJsonMessage);
    }
  }, [lastJsonMessage]);

  // voice record handler
  useEffect(() => {
    if (isRecording) {
      handleStartRecording({
        mediaRecorderRef,
        setAudioUrl,
        setFile,
      });
    } else {
      handleStopRecording({ mediaRecorderRef });
    }
  }, [isRecording]);

  return (
    <div className='home-ai-record'>
      {/* dummy voice */}
      <audio
        id='audio'
        preload='none'
        ref={audioRef}
        style={{ display: "none" }} // for challenge - 1
        onContextMenu={() => false}
        onEnded={() => setPaused(true)}
        hidden
        src={audioUrl}></audio>
      {/* seperate from dummy voice */}
      {isFetch ? (
        // home ai content output - after fetch from server
        <div className='home-ai-record-fetch'>
          <AiOutput
            setPaused={setPaused}
            paused={paused}
            audioRef={audioRef && audioRef}
            text={text}
            currentTab={"record"}
            duration={audioDuration}
            lang={langSelect}
            setIsFetch={setIsFetch}
          />
        </div>
      ) : // home ai content output - before fetch from server
      startFetch ? (
        <Loader />
      ) : (
        <motion.div
          className='home-ai-record-prefetch'
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.3 }}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}>
          <div className='home-ai-record'>
            {/* stope record */}
            {isRecording && (
              <div className='stopIcon' onClick={() => setIsRecording(false)}>
                <StopCircleOutlined fontSize='large' />
              </div>
            )}
            {/* start record */}
            <div
              className={`ha-record-icon-container ${
                isRecording && "change-ha-record-icon-container"
              }`}
              onClick={() => setIsRecording(true)}>
              {/* record mic icon */}
              {recordMic}
            </div>
          </div>
          <span className='ha-record-text'>
            برای شروع به صحبت، دکمه را فشار دهید متن پیاده شده آن، در اینجا ظاهر
            شود
          </span>
        </motion.div>
      )}
      {/* home bottom - language select */}
      <HomeLang
        isFetch={isFetch}
        menuOpen={menuOpen}
        langSelect={langSelect}
        setLangSelect={setLangSelect}
        setMenuOpen={setMenuOpen}
      />
    </div>
  );
};

export default HomeAiRecord;
