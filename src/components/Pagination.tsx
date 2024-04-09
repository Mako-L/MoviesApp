import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";


const usePagination = ({
    currPage,
    totalPages,
    pagesPerBatch,
  }: Record<string, number>) => {
    const pagination = React.useMemo(() => {
      let pages = [];
      let startPage = Math.max(1, currPage - Math.floor(pagesPerBatch / 2));
      let endPage = Math.min(totalPages, startPage + pagesPerBatch - 1);
      
      startPage = Math.max(1, endPage - pagesPerBatch + 1);
  
      if (startPage > 1) pages.push(1);
      if (startPage > 2) pages.push("start-ellipsis");
  
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
  
      // Ellipsis and last page if necessary
      if (endPage < totalPages - 1) pages.push("end-ellipsis");
      if (endPage < totalPages) pages.push(totalPages);
  
      return pages;
    }, [currPage, totalPages, pagesPerBatch]);
  
    return pagination;
  };

export interface PaginationProps {
  currPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pagesPerBatch?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currPage,
  totalPages,
  onPageChange,
  pagesPerBatch = 2,
}) => {
  const getPageNumbers = usePagination({
    currPage,
    totalPages,
    pagesPerBatch,
  });

  const handlePageChange = (pageNum: number | string) => {
    if (typeof pageNum === "number" && pageNum >= 1 && pageNum <= totalPages) {
      onPageChange(pageNum);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.button, currPage === 1 && styles.disabledButton]}
        onPress={() => handlePageChange(currPage - 1)}
        disabled={currPage === 1}
      >
        <Text style={styles.buttonText}>{"<"}</Text>
      </Pressable>
      {getPageNumbers.map((pageNum, index) => (
        <Pressable
          disabled={typeof pageNum === "string" || currPage === pageNum}
          key={typeof pageNum === "string" ? pageNum + index : pageNum}
          style={styles.button}
          onPress={() => handlePageChange(pageNum)}
        >
          <Text
            style={[
              styles.buttonText,
              typeof pageNum === "number" && currPage === pageNum && styles.activeButtonText,
            ]}
          >
            {typeof pageNum === "string" ? "..." : pageNum}
          </Text>
        </Pressable>
      ))}
      <Pressable
        style={[
          styles.button,
          currPage === totalPages && styles.disabledButton,
        ]}
        onPress={() => handlePageChange(currPage + 1)}
        disabled={currPage === totalPages}
      >
        <Text style={styles.buttonText}>{">"}</Text>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    height: 35,
    width: 35,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#FFF",
    margin:2,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    
    elevation: 2,
  },
  buttonText: {
    fontSize: 14,
    color: "#666666",
  },
  activeButtonText: {
    color: "#EF7E22",
  },
  disabledButton: {
    opacity: 0.5,
  },
});

export default React.memo(Pagination);