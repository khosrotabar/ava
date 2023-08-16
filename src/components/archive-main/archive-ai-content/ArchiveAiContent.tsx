import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

import { archiveTools } from "@/utilities/archive-tools/archive-tools";
import AiFile from "./ai-file/AiFile";
import { data } from "@/shared/types";
import { listApi } from "@/api/AsyncAPI";

const ArchiveAiContent = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [data, setData] = useState<data | null>(null);
  const [itemsPerPage, setItemsPerPage] = useState<number>(8);

  // the number of items to display per page in archive
  useEffect(() => {
    // first load
    const pageHeight = document.documentElement.scrollHeight;

    if (pageHeight < 811) {
      setItemsPerPage(6);
    } else {
      setItemsPerPage(8);
    }

    // continuously detect the page height - for desktop responsive
    function updateX() {
      const pageHeight = document.documentElement.scrollHeight;

      if (pageHeight < 811) {
        setItemsPerPage(6);
      } else {
        setItemsPerPage(8);
      }
    }

    window.onresize = updateX;
  }, []);

  // calculate the total number of pages
  const pageCount = Math.ceil((data ? data.count! : 0) / itemsPerPage);

  // function to handle page change
  const handlePageChange = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected);
  };

  // calculate the start and end index for the current page
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // get the items for the current page
  const currentPageItems = data
    ? data?.results?.slice(startIndex, endIndex)
    : [];

  // open/close ai file handler
  const onItemClick = (itemId: number) => {
    const updatedState = {
      ...data!,
      results: data?.results?.map((result) => {
        if (result.id === itemId) {
          return {
            ...result,
            isActive: true,
          };
        } else if (result.id !== itemId) {
          return {
            ...result,
            isActive: false,
          };
        }
        return result;
      }),
    };

    setData(updatedState);
  };

  // run list api for archive - get list api
  useEffect(() => {
    listApi({ setData });
  }, []);

  return (
    <div className='archive-ai-content'>
      {/* Display data */}
      <div className='ai-files-container'>
        {currentPageItems?.length === 0
          ? // preview of lists
            Array(6)
              .fill(0)
              .map((_, index) => {
                return (
                  <div className='skeleton' key={index}>
                    {archiveTools.previewTag}
                  </div>
                );
              })
          : currentPageItems?.map((item) => {
              return (
                <AiFile
                  key={item.id}
                  files={data}
                  setFiles={setData}
                  item={item}
                  onItemClick={onItemClick}
                />
              );
            })}
      </div>

      {/* Render the pagination component */}
      {pageCount > 1 && (
        <div className='pagination-container'>
          <ReactPaginate
            previousLabel={archiveTools.prevSvg}
            nextLabel={archiveTools.nextSvg}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={pageCount}
            marginPagesDisplayed={1}
            pageRangeDisplayed={3}
            onPageChange={handlePageChange}
            containerClassName={"pagination"}
            activeClassName={"active"}
          />
        </div>
      )}
    </div>
  );
};

export default ArchiveAiContent;
