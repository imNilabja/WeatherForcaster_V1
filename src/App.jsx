/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'


function App() {
  const [humidity, setHumidity] = useState(0)
  const [place, setPlace] = useState()
  const [location, setLocation] = useState()
  const [temp, setTemp] = useState(0)
  const [Maxtemp, setMaxTemp] = useState(0)
  const [Mintemp, setMinTemp] = useState(0)
  const [wspeed, setWspeed] = useState(0)

  useEffect(() => {
    api();
  }, [])


  const api = async () => {
    const req = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${place}?unitGroup=metric&key=HLKNA9VH887J5ENCJBR9G4ZU4&contentType=json`, { method: "GET" })
    const data = await req.json()

    console.log(data)
    console.log(data.currentConditions.humidity)
    setHumidity(data.currentConditions.humidity)
    setLocation(data.resolvedAddress)
    setTemp(data.days[0].temp)
    setMaxTemp(data.days[0].tempmax)
    setMinTemp(data.days[0].tempmin)
    setWspeed(data.days[0].windspeed)
  }

  const changeHandler = (e) => {
    setPlace(e.target.value)
    console.log(e.target.value)

  }


  return (
    <>
      <Navbar />

      <div className='w-[100vw] flex justify-center min-h-[200px] items-center'>
        <input onChange={changeHandler} type="text" name='place' className='border border-black px-2 py-1 w-[300px] rounded-lg' />
        <button className='bg-violet-300 px-3 py-1 rounded-xl mx-2' onClick={api}>submit</button>
      </div>
      <div className=' w-[100vw] min-h-[200px] flex justify-center gap-4 items-center text-white font-bold'>

        <p>Location: {location}</p>
        <p>humidity: {humidity}</p>
        <p>Current temperature: {temp}</p>
        <p>Max temperature: {Maxtemp}</p>
        <p>Min temperature: {Mintemp}</p>
        <p>Wind Speed: {wspeed}</p>

      </div>

    </>
  )
}

export default App
