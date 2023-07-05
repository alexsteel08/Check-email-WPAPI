import React, { useState, useEffect } from 'react'

const App = () => {
  const [inputValue, setInputValue] = useState('')
  const [repeaterData, setRepeaterData] = useState([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://react.test-area.pp.ua/wp-json/acf/v3/options/theme-settings-header'
        )
        const data = await response.json()

        const repeaterValues = data.acf.users_list
        setRepeaterData(repeaterValues)
      } catch (error) {
        console.error('error to fetch WordPress REST API:', error)
      }
    }

    fetchData()
  }, [])

  const handleInputChange = event => {
    setInputValue(event.target.value)
  }

  const handleSubmit = () => {
    const exists = repeaterData.some(item => item.email === inputValue)

    if (exists) {
      setMessage('email exist!')
    } else {
      setMessage('email not exist.')
    }
  }

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
      />
      <button onClick={handleSubmit}>Submit</button>
      <p>{message}</p>
    </div>
  )
}

export default App
