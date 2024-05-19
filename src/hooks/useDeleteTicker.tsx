import { useState } from 'react'
import axios from 'axios'
import { useConfig } from './useConfig'

interface UseDeleteTickerResult {
  deleteTicker: (ticker: string) => Promise<void>
  success: boolean | null
  error: string | null
}

const useDeleteTicker = (adminPassword: string): UseDeleteTickerResult => {
  const [success, setSuccess] = useState<boolean | null>(null)
  const [error, setError] = useState<string | null>(null)
  const { apiUrl } = useConfig()
  const deleteTicker = async (ticker: string) => {
    try {
      const response = await axios.delete(`${apiUrl}/tickers/${ticker}`, {
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
      setError('Failed to delete ticker')
    }
  }

  return { deleteTicker, success, error }
}

export default useDeleteTicker
