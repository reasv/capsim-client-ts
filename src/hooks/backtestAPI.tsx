import { useState } from 'react';
import axios from 'axios';
import { useConfig } from './useConfig';

export interface PortfolioParams {
  ticker: string;
  start_date: string;
  initial_investment: number;
  dividend_tax: number;
  capital_gains_tax: number;
  yearly_sale_percentage: number;
  name?: string;
}

export interface PortfolioResult {
  name: string;
  ticker: string;
  start_date: string;
  initial_investment: number;
  monthly_results: Record<string, any>[] | null;
  yearly_results: Record<string, any>[] | null;
}

export interface UsePortfolioBacktestReturn {
  simulatePortfolios: (portfolios: PortfolioParams[]) => Promise<void>;
  results: PortfolioResult[] | null;
  loading: boolean;
  error: string | null;
}

export const usePortfolioBacktest = (): UsePortfolioBacktestReturn => {
  const [results, setResults] = useState<PortfolioResult[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { apiUrl } = useConfig();
  const simulatePortfolios = async (portfolios: PortfolioParams[]) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${apiUrl}/backtest`, {
        portfolios,
      });

      setResults(response.data.results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return { simulatePortfolios, results, loading, error };
};
