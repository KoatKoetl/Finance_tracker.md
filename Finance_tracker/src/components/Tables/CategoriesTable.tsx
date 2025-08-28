import { type Expense } from "../../types/expenses";
import { useState } from "react";
import { useTranslation } from "react-i18next";

// ShadcnUI components
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import TablePagination from "./TablesPagination";

interface ExpensesTableProps {
  data: Expense[];
}

const ExpensesTable = ({ data }: ExpensesTableProps) => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const totalPages = Math.ceil(data.length / pageSize);

  const currentData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="w-full min-h-[540px] p-4 flex flex-col ">
      <h2 className="text-xl font-semibold mb-4 text-center">
        {t("allData.title")}
      </h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t("allData.categories")}</TableHead>
            <TableHead>{t("allData.amount")}</TableHead>
            <TableHead className="max-w-7">{t("allData.currency")}</TableHead>
            <TableHead>{t("allData.note")}</TableHead>
            <TableHead className="max-w-16">{t("allData.createdAt")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentData.length > 0 ? (
            currentData.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{item.category}</TableCell>
                <TableCell>{item.amount}</TableCell>
                <TableCell className="max-w-7">{item.currency}</TableCell>
                <TableCell>{item.note}</TableCell>
                <TableCell className="max-w-16">{item.created_at}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center h-48 text-gray-500">
                {t("allData.noData")}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {totalPages > 1 && (
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default ExpensesTable;
