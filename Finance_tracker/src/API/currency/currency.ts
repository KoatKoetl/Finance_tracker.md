import { useQuery } from "@tanstack/react-query";

export const BASE_CURRENCY = "MDL";

const fetchExchangeRates = async () => {
  const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${BASE_CURRENCY.toLowerCase()}.json`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch exchange rates.");
  }

  const data = await response.json();
  return data[BASE_CURRENCY.toLowerCase()];
};

export const useExchangeRates = () => {
  return useQuery({
    queryKey: ["exchangeRates"],
    queryFn: fetchExchangeRates,
    staleTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: true,
  });
};
