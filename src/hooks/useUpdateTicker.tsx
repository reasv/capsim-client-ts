import { useState } from 'react'
import axios from 'axios'
import { useConfig } from './useConfig'

interface UseUpdateTickerResult {
  updateTicker: (ticker: string) => Promise<void>
  success: boolean | null
  error: string | null
}

const useUpdateTicker = (adminPassword: string): UseUpdateTickerResult => {
  const [success, setSuccess] = useState<boolean | null>(null)
  const [error, setError] = useState<string | null>(null)
  const { apiUrl } = useConfig()
  const updateTicker = async (ticker: string) => {
    try {
      const response = await axios.put(`${apiUrl}/tickers/${ticker}`, null, {
        headers: {
          'Authorization': adminPassword
        }
      })

      if (response.status === 200) {
        setSuccess(true)
      } else {
        setSuccess(false)
      }
    } catch (error) {
      setSuccess(false)
      setError('Failed to update ticker')
    }
  }

  return { updateTicker, success, error }
}

export default useUpdateTicker
