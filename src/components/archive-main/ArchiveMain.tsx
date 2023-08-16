import ArchiveAiContent from "./archive-ai-content/ArchiveAiContent";

const ArchiveMain = () => {
  return (
    <div className='archive-main'>
      {/* archive title */}
      <span className='archive-main-title'>آرشیو من</span>
      {/* ai files header */}
      <div className='header'>
        <div className='first-space'></div>
        <span className='cl-name'>نام فایل</span>
        <span className='cl-date'>تاریخ بارگذاری</span>
        <span className='cl-type'>نوع فایل</span>
        <span className='cl-duration'>مدت زمان</span>
        <div className='last-space'></div>
      </div>
      {/* ai content - holder of all ai file outputs */}
      <ArchiveAiContent />
    </div>
  );
};

export default ArchiveMain;
