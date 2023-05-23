import { downloadExcel } from 'react-export-table-to-excel';

interface IGenerateExcelProps {
  fileName: string;
  sheet: string;
  tableHeader: string[];
  tableBody: any;
  className?: string;
}

export const handleDownloadExcel = ({
  fileName,
  sheet,
  tableHeader,
  tableBody
}: IGenerateExcelProps) => {
  downloadExcel({
    fileName: fileName,
    sheet: sheet,
    tablePayload: {
      header: tableHeader,
      body: tableBody
    }
  });
};
