import { useAuthStore } from "../stores/AuthStore";
import { useEffect, useMemo } from "react";
import { useStatisticsStore } from "../stores/FetchUserData";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import PercentagePieChart from "../components/StatiscticsComponents/StatisticsPieChart";
import { useTranslation } from "react-i18next";

const Statistics = () => {
  const { userId } = useAuthStore();
  const { fetchExpenses, expenses, loading, error } = useStatisticsStore();
  const { t } = useTranslation();

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

  useEffect(() => {
    if (!userId) return;
    fetchExpenses(userId);
  }, [userId, fetchExpenses]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <>
      <div>
        <h1>Statistics Page</h1>
        <PercentagePieChart
          data={totalCategories}
          titleKey={t("allUniqueCategories")}
        />
      </div>
    </>
  );
};

export default Statistics;
