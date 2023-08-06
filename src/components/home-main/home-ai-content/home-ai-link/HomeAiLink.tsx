import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AiOutput from "@/components/ai-output/AiOutput";
import HomeLang from "@/components/home-main/home-lang/HomeLang";
import { linkIcon } from "@/utilities/svg/svg";
import { linkHandler } from "@/helpers/home-link-functions";

const HomeAiLink = () => {
  const [isFetch, setIsFetch] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [langSelect, setLangSelect] = useState<string>("FA");
  const [paused, setPaused] = useState<boolean>(true);
  const [linkValue, setLinkValue] = useState<string>("");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioDuration, setAudioDuration] = useState<number>(0);
  const notify = (value: string) => toast.error(value);

  // dummy simple text
  const text =
    "[با][---][---] [با] و[---][---] [با][---][---][---][---] کجایی تو [خوش] می دیدی من خسته شدم [ما را] [به] این [زودی] چه جوری شد [عشق شدی] به این است[---] [آخرش] سی با فکر [و] چقدر [نزار می خوام] که [چشم تو] [و با رفت][---][---][---][---][---][---][---][---] سخت [آرام] ولی ازت می خوام[---] بر نگردی هر کسی که به [تو] باشه[---] کاشکی تو منو [بردی] [که چشمک][---] با[---][---][---][---][---] [ابو][---] [با] و و و و و [او]";
  const engText =
    "[---][---] Lili, take another walk out [of] your fake world [---][---] [Please] put all the drugs out of your hand [---][---] [---][---] You'll see that you can breathe without no back [up] [---][---] So much [stuff] you got to [understand] For every step [---][---] in any walkAny town of any thought[I'll] be your guideFor every street of [any] [sceneAny] place you've never [beenI'll] be your guide [---][---][---][---]";

  // dummy time text
  const timeText = [
    {
      id: 1,
      text: "[با]",
      from: 0,
      to: 3,
    },
    {
      id: 2,
      text: "[---]",
      from: 3,
      to: 6,
    },
    {
      id: 3,
      text: "[---]",
      from: 6,
      to: 8,
    },
    {
      id: 4,
      text: "[با]",
      from: 8,
      to: 12,
    },
    {
      id: 5,
      text: "[او]",
      from: 12,
      to: 14,
    },
    {
      id: 6,
      text: "و و و و و",
      from: 14,
      to: 18,
    },
  ];
  const engtimeText = [
    {
      id: 1,
      text: "lili",
      from: 0,
      to: 2,
    },
    {
      id: 2,
      text: "[---]",
      from: 2,
      to: 4,
    },
    {
      id: 3,
      text: "takeanother walk",
      from: 4,
      to: 7,
    },
    {
      id: 4,
      text: "[---]",
      from: 7,
      to: 8,
    },
    {
      id: 5,
      text: "out [of] your fake world",
      from: 8,
      to: 14,
    },
  ];

  // link handle click
  const linkHandleClick = () => {
    linkHandler({ linkValue, notify, setAudioDuration, setIsFetch });
  };

  // api for link

  return (
    <div className="home-ai-link">
      {/* toast for link input alerts */}
      <ToastContainer position="bottom-left" style={{ color: "#ff1654" }} />
      {/* dummy voice - it will be with fetch / context */}
      <audio
        id="audio"
        preload="none"
        ref={audioRef}
        style={{ display: "none" }} // for challenge - 1
        onContextMenu={() => false}
        onEnded={() => setPaused(true)}
        hidden
        src={linkValue}
      ></audio>
      {/* seperate from dummy voice */}
      {isFetch ? (
        // home ai content output - after fetch from server
        <div className="home-ai-link-fetch">
          <AiOutput
            setPaused={setPaused}
            paused={paused}
            audioRef={audioRef && audioRef}
            text={langSelect === "FA" ? text : engText}
            timeText={langSelect === "FA" ? timeText : engtimeText}
            currentTab={"link"}
            duration={audioDuration}
            lang={langSelect}
            setIsFetch={setIsFetch}
          />
        </div>
      ) : (
        // home ai content output - before fetch from server
        <motion.div
          className="home-ai-link-prefetch"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.3 }}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <div className="ha-link-container">
            <div className="ha-link-icon-container" onClick={linkHandleClick}>
              {/* link icon */}
              {linkIcon}
            </div>
            <input
              type="text"
              placeholder="example.com/sample.mp3"
              className="ha-link-input"
              value={linkValue}
              onChange={(event) => setLinkValue(event.target.value)}
            />
          </div>
          <span className="ha-link-text">
            نشانی اینترنتی فایل حاوی گفتار (صوتی/تصویری) را وارد و دکمه را فشار
            دهید
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

export default HomeAiLink;
