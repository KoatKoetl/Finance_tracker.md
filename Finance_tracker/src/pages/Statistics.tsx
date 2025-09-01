import { useAuthStore } from "../stores/AuthStore";
import { useMemo } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import PercentagePieChart from "../components/StatiscticsComponents/StatisticsPieChart";
import { useTranslation } from "react-i18next";
import ExpensesTable from "../components/Tables/CategoriesTable";
import { useQuery } from "@tanstack/react-query";
import { fetchUserExpenses } from "../API/FetchExpenses";

const Statistics = () => {
  const { userId } = useAuthStore();
  const {
    data: expenses,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["expenses", userId],
    queryFn: () => fetchUserExpenses(userId!),
    enabled: !!userId,
  });
  const { t, i18n } = useTranslation();

  const expensesData = useMemo(() => {
    if (!expenses || expenses.length === 0) return [];

    const expensesData = expenses.map((item) => {
      const date = new Date(item.created_at);
      const formattedDate = date.toLocaleString(i18n.language, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      return {
        id: item.id,
        amount: item.amount,
        currency: item.currency,
        category: item.category,
        note: item.note,
        created_at: formattedDate,
      };
    });

    return expensesData;
  }, [expenses, i18n.language]);

  const totalCategories = useMemo(() => {
    if (!expenses || expenses.length === 0) return [];

    const categoryCounts = expenses.reduce((acc, curr) => {
      acc.set(curr.category, (acc.get(curr.category) || 0) + 1);
      return acc;
    }, new Map());

    const totalExpenses = expenses.length;

    const categoriesWithPercentages = Array.from(categoryCounts).map(
      ([category, count]) => {
        const percentage = (count / totalExpenses) * 100;
        const formattedPercentage = parseFloat(percentage.toFixed(2));
        return {
          name: category,
          value: formattedPercentage,
        };
      }
    );

    return categoriesWithPercentages;
  }, [expenses]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <>
      <div>
        <div className="flex justify-center">
          <ExpensesTable data={expensesData} />
        </div>
        <div className="flex flex-wrap justify-center">
          <PercentagePieChart
            data={totalCategories}
            titleKey={t("allUniqueCategories")}
          />
        </div>
      </div>
    </>
  );
};

export default Statistics;
