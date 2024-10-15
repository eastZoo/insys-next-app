import * as S from "./ServerSideGrid.style";
import { AgGridReact } from "ag-grid-react";
import { useMemo, useRef, useState } from "react";
import {
  ColDef,
  SizeColumnsToContentStrategy,
  SizeColumnsToFitGridStrategy,
  SizeColumnsToFitProvidedWidthStrategy,
} from "ag-grid-community";
import { ServerSidePagination } from "../../containers/Grid/ServerSidePagination";

interface GridProps {
  gridTitle?: string;
  width?: number;
  height?: any;
  defaultPageSize?: number;
  paging?: boolean;
  pagingShow?: boolean;
  rowData?: any[];
  columnDefs?: ColDef[];
  total: number;
  rowSelection?: "single" | "multiple";
  currentPage: number;
  setCurrentPage: (page: number) => void;
  isLoading: boolean;
}

const defaultColDef: ColDef = {
  cellStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  headerClass: "custom-header",
};

export const ServerSideGrid = ({
  gridTitle,
  width,
  height,
  defaultPageSize = 10,
  paging = true,
  pagingShow = true,
  rowData,
  columnDefs,
  rowSelection,
  total,
  currentPage,
  isLoading,
  setCurrentPage,
}: GridProps) => {
  const gridRef = useRef<AgGridReact>(null);
  const [pageSize, setPageSize] = useState(defaultPageSize);

  const autoSizeStrategy = useMemo<
    | SizeColumnsToFitGridStrategy
    | SizeColumnsToFitProvidedWidthStrategy
    | SizeColumnsToContentStrategy
  >(() => {
    return {
      type: "fitGridWidth",
      defaultMinWidth: 40,
    };
  }, []);

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = parseInt(e.target.value, 10);
    if (gridRef.current && gridRef.current.api) {
      setPageSize(newSize);
    }
  };

  return (
    <S.GridBox $pagingShow={pagingShow} $height={height}>
      {gridTitle && <S.GridTit>{gridTitle}</S.GridTit>}
      <div className="ag-theme-quartz">
        <S.Grid $height={height}>
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            pagination={paging}
            headerHeight={40}
            suppressPaginationPanel={paging}
            paginationPageSize={pageSize}
            rowSelection={rowSelection}
            defaultColDef={defaultColDef}
            overlayNoRowsTemplate="조회 결과가 없습니다"
            autoSizeStrategy={autoSizeStrategy}
            cacheBlockSize={10}
            loading={isLoading}
          />
        </S.Grid>
      </div>
      {paging && (
        <ServerSidePagination
          gridRef={gridRef}
          isLoading={isLoading}
          // total={rowData?.length ?? 0}
          total={total}
          pageSize={pageSize}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          onPageSizeChange={handlePageSizeChange}
        />
      )}
    </S.GridBox>
  );
};
