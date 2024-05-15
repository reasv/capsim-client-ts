import { useState, useEffect } from 'react';
import axios from 'axios';
import { useConfig } from './useConfig';

interface Ticker {
  value: string;
  label: string;
}

interface UseTickersResult {
  tickers: Ticker[];
  loading: boolean;
  error: Error | null;
}

const useTickers = (): UseTickersResult => {
  const { apiUrl } = useConfig();
  const [tickers, setTickers] = useState<Ticker[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchTickers = async () => {
      try {
        const response = await axios.get<string[]>(`${apiUrl}/tickers`);
        const formattedTickers = response.data.map(ticker => ({
          value: ticker,
          label: ticker
        }));
        setTickers(formattedTickers);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickers();
  }, []);

  return { tickers, loading, error };
};

export default useTickers;