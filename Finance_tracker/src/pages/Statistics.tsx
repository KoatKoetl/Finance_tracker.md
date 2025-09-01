import { useAuthStore } from "../stores/AuthStore";
import { useMemo } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import MoneySpentPieChart from "../components/StatiscticsComponents/MoneySpentPieChart";
import CategoriesPieChart from "../components/StatiscticsComponents/CategoriesPieChart";
import { useTranslation } from "react-i18next";
import ExpensesTable from "../components/Tables/CategoriesTable";
import { useQuery } from "@tanstack/react-query";
import { fetchUserExpenses } from "../API/FetchExpenses";
import { useExchangeRates, BASE_CURRENCY } from "../API/currency/currency";

const Statistics = () => {
  const { userId } = useAuthStore();
  const {
    data: expenses,
    isLoading: areExpensesLoading,
    isError: areExpensesError,
    error: expensesError,
  } = useQuery({
    queryKey: ["expenses", userId],
    queryFn: () => fetchUserExpenses(userId!),
    enabled: !!userId,
  });
  const {
    data: rates,
    isLoading: areRatesLoading,
    isError: areRatesError,
    error: ratesError,
  } = useExchangeRates();

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

  const categoriesMoneySpent = useMemo(() => {
    if (!expenses || !rates || expenses.length === 0) {
      return [];
    }

    const categoriesMoney = expenses.reduce((acc, curr) => {
      let amountInBaseCurrency = curr.amount;

      if (curr.currency !== BASE_CURRENCY) {
        const rate = rates[curr.currency.toLowerCase()];
        if (rate) {
          amountInBaseCurrency = curr.amount / rate;
        } else {
          console.warn(`Exchange rate for ${curr.currency} not found.`);
          return acc;
        }
      }

      acc.set(
        curr.category,
        (acc.get(curr.category) || 0) + amountInBaseCurrency
      );
      return acc;
    }, new Map<string, number>());

    return Array.from(categoriesMoney.entries()).map(([name, value]) => ({
      name,
      value: Number(value.toFixed(2)),
      currency: BASE_CURRENCY,
    }));
  }, [expenses, rates]);

  if (areExpensesLoading || areRatesLoading) {
    return <LoadingSpinner />;
  }

  if (areExpensesError || areRatesError) {
    return (
      <ErrorMessage
        message={
          areExpensesError
            ? expensesError.message
            : ratesError?.message ?? t("unknownError")
        }
      />
    );
  }

  return (
    <>
      <div>
        <div className="flex justify-center">
          <ExpensesTable data={expensesData} />
        </div>
        <div className="flex flex-wrap justify-center">
          <CategoriesPieChart
            data={totalCategories}
            titleKey={t("allUniqueCategories")}
          />
          <MoneySpentPieChart
            data={categoriesMoneySpent}
            titleKey={t("totalSpentMoney")}
          />
        </div>
      </div>
    </>
  );
};

export default Statistics;
