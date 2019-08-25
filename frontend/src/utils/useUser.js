import { useState, useEffect } from 'react'

import * as api from 'utils/api'

export default () => {
  const [user, setUser] = useState()

  useEffect(() => {
    const fetchData = async () => {
      const user = await api.getUser()
      setUser(user)
    }

    fetchData()
  }, [])

  return user
}
