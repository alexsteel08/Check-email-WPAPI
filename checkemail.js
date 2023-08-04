import React, { useState } from 'react'
function App() {
  const [name, setName] = useState('')
  const [result, setResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const token =
    'i9zuuggija2lo1yw2wyrv5rc7xidlklty7umpbdltme9gaacpssjvw2ocbfn8wsc'
  const handleSubmit = async event => {
    event.preventDefault()
    setResult(null)
    setIsLoading(true)
    try {
      const response = await fetch(
        `https://react.test-area.pp.ua/wp-json/custom/v1/data?token=${token}`
      )
      const data = await response.json()
      const foundItem = data.find(item => item.name === name)

      if (foundItem) {
        setResult(true)
      } else {
        setResult(false)
      }
    } catch (error) {
      console.error('Error connect to API:', error)
      setResult('Error connect to API.')
    }
    setIsLoading(false)
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={event => setName(event.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      {isLoading && <p>Loading...</p>}
      {result !== null && <p>Value {result ? 'true' : 'false'}.</p>}
    </div>
  )
}

export default App
