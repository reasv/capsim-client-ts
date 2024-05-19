import { useState, useEffect } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

const useAuthCheck = () => {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null)
  const [error, setError] = useState<string | null>(null)

  const checkPassword = async (password: string) => {
    try {
      const response = await axios.get('/auth-check', {
        headers: {
          'Authorization': password
        }
      })

      if (response.status === 200 && response.data.authorized) {
        Cookies.set('authPassword', password, { expires: 1 }) // Set cookie for 1 day
        setIsAuthorized(true)
      } else {
        setIsAuthorized(false)
      }
    } catch (error) {
      setIsAuthorized(false)
      setError('Authorization failed')
    }
  }

  useEffect(() => {
    const authPassword = Cookies.get('authPassword')
    if (authPassword) {
      checkPassword(authPassword)
    }
  }, [])

  return { isAuthorized, error, checkPassword }
}

export default useAuthCheck
