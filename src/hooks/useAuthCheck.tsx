import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useConfig } from './useConfig';

interface UseAuthCheckResult {
  isAuthorized: boolean | null;
  error: string | null;
  password: string | null;
  checkPassword: (password: string) => Promise<void>;
}

const useAuthCheck = (): UseAuthCheckResult => {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const { apiUrl } = useConfig();
  const checkPassword = async (password: string) => {
    try {
      const response = await axios.get(`${apiUrl}/auth-check`, {
        headers: {
          'Authorization': password
        }
      });

      if (response.status === 200 && response.data.authorized) {
        Cookies.set('authPassword', password, { expires: 1 }); // Set cookie for 1 day
        setIsAuthorized(true);
        setPassword(password);
      } else {
        setIsAuthorized(false);
        setPassword(null);
      }
    } catch (error) {
      setIsAuthorized(false);
      setError('Authorization failed');
      setPassword(null);
    }
  };

  useEffect(() => {
    const authPassword = Cookies.get('authPassword');
    if (authPassword) {
      checkPassword(authPassword);
    }
  }, []);

  return { isAuthorized, error, password, checkPassword };
};

export default useAuthCheck;