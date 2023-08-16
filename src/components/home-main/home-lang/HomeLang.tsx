import { homeLangProps } from "@/shared/types";

const HomeLang = ({
  isFetch,
  menuOpen,
  langSelect,
  setMenuOpen,
  setLangSelect,
}: homeLangProps) => {
  return (
    <div className='home-bottom-lang'>
      {/* disable hover - after fetch */}
      {isFetch && <div className='lang-hover'></div>}
      {/* language select */}
      <div
        className={
          menuOpen ? "hb-lang-select change-hb-lang-select" : "hb-lang-select"
        }>
        {/* language select - final value */}
        <div
          className='hb-lang-select-top'
          onClick={() => setMenuOpen(!menuOpen)}>
          {/* drop icon */}
          <svg
            width='7'
            height='5'
            viewBox='0 0 7 5'
            fill='none'
            className={menuOpen ? "drop-icon" : ""}>
            <path
              d='M4.65282 4.12713C4.25404 4.58759 3.53973 4.58759 3.14096 4.12713L1.08888 1.7576C0.528006 1.10995 0.988058 0.102941 1.84481 0.102941L5.94896 0.102942C6.80571 0.102942 7.26577 1.10995 6.70489 1.7576L4.65282 4.12713Z'
              fill='#00BA9F'
            />
          </svg>
          <p className='hb-lang-select-current-lang'>
            {langSelect === "fa" ? "فارسی" : "انگلیسی"}
          </p>
        </div>
        {/* line spacing */}
        <div className='hr-line-space'></div>
        {/* language select - center - fa */}
        <div
          className='hb-lang-select-center'
          onClick={() => {
            setMenuOpen(!menuOpen), setLangSelect("fa");
          }}>
          <p className='hb-lang-select-first'>فارسی</p>
        </div>
        {/* line spacing */}
        <div className='hr-line-space'></div>
        {/* language select - bottom - en */}
        <div
          className='hb-lang-select-bottom'
          onClick={() => {
            setMenuOpen(!menuOpen), setLangSelect("en");
          }}>
          <p className='hb-lang-select-second'>انگلیسی</p>
        </div>
      </div>
      {/* home language title */}
      <span className='hb-lang-text'>:زبان گفتار</span>
    </div>
  );
};

export default HomeLang;
