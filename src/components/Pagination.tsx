// Importing React and necessary components from react-native
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
// Importing custom styles for pagination
import { paginationStyles } from '../styles';

/**
 * Custom hook to calculate pages for pagination.
 * 
 * @param{Record<string, number>} param0 - An object containing the current page, total pages, and the number of pages to display per batch.
 * @returns{Array} - An array representing the pages to be displayed in the pagination component.
 */
const usePagination = ({
    currPage,
    totalPages,
    pagesPerBatch,
  }: Record<string, number>) =>{
    // useMemo is used to recalculate pagination only when currPage, totalPages, or pagesPerBatch changes.
    const pagination = React.useMemo(() =>{
      let pages = [];
      let startPage = Math.max(1, currPage - Math.floor(pagesPerBatch / 2)); // Calculate the first page to display.
      let endPage = Math.min(totalPages, startPage + pagesPerBatch - 1); // Calculate the last page to display.
      
      // Adjust the start page if necessary to ensure the correct number of pages are displayed.
      startPage = Math.max(1, endPage - pagesPerBatch + 1);
  
      // Adding the first page and ellipses if needed
      if (startPage > 1) pages.push(1);
      if (startPage > 2) pages.push("start-ellipsis");
  
      // Add all pages from startPage to endPage
      for (let i = startPage; i <= endPage; i++){
        pages.push(i);
      }

      // Add ellipses and the last page number if there's a gap between displayed and total pages
      if (endPage < totalPages - 1) pages.push("end-ellipsis");
      if (endPage < totalPages) pages.push(totalPages);
  
      return pages;
    }, [currPage, totalPages, pagesPerBatch]);
  
    return pagination;
  };

// Type definitions for props expected by the Pagination component
export interface PaginationProps{
  currPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pagesPerBatch?: number;
}

/**
 * Pagination component for navigating between pages.
 * 
 * @param{PaginationProps} - Destructuring to extract currPage, totalPages, onPageChange, and pagesPerBatch with a default value.
 */
const Pagination: React.FC<PaginationProps> = ({
  currPage,
  totalPages,
  onPageChange,
  pagesPerBatch = 2,
}) =>{
  // Fetching an array of pages to display from the custom hook
  const getPageNumbers = usePagination({
    currPage,
    totalPages,
    pagesPerBatch,
  });

  // Handles clicks on pagination buttons, invoking onPageChange for valid numeric pages
  const handlePageChange = (pageNum: number | string) =>{
    if (typeof pageNum === "number" && pageNum >= 1 && pageNum <= totalPages){
      onPageChange(pageNum);
    }
  };

  return (
    <View style={paginationStyles.container}> 
     {/* Button to navigate to the previous page */}
      <Pressable
        style={[paginationStyles.button, currPage === 1 && paginationStyles.disabledButton]}  // Disables button if on the first page
        onPress={() => handlePageChange(currPage - 1)}
        disabled={currPage === 1}
      >
        <Text style={paginationStyles.buttonText}>{"<"}</Text>
      </Pressable>
      {/* Dynamically generated page numbers */}
      {getPageNumbers.map((pageNum, index) => (
        <Pressable
          disabled={typeof pageNum === "string" || currPage === pageNum}  // Disable button for current page or ellipses
          key={typeof pageNum === "string" ? pageNum + index : pageNum}  // Unique key for React elements
          style={paginationStyles.button}
          onPress={() => handlePageChange(pageNum)}
        >
          <Text
            style={[
              paginationStyles.buttonText,
              typeof pageNum === "number" && currPage === pageNum && paginationStyles.activeButtonText,  // Highlight the current page
            ]}
          >
           {typeof pageNum === "string" ? "..." : pageNum}
          </Text>
        </Pressable>
      ))}
      {/* Button to navigate to the next page */}
      <Pressable
        style={[
          paginationStyles.button,
          currPage === totalPages && paginationStyles.disabledButton,  // Disables button if on the last page
        ]}
        onPress={() => handlePageChange(currPage + 1)}
        disabled={currPage === totalPages}
      >
        <Text style={paginationStyles.buttonText}>{">"}</Text>
      </Pressable>
    </View>
  );
};

// Wrapping the component with React.memo for performance optimization to prevent unnecessary re-renders
export default React.memo(Pagination);
