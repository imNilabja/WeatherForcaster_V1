/* eslint-disable no-unused-vars */
import { useState, useEffect,useRef } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'


function App() {
  const [humidity, setHumidity] = useState(0)
  const [place, setPlace] = useState()
  const [location, setLocation] = useState()
  const [temp, setTemp] = useState(0)
  const [Maxtemp, setMaxTemp] = useState(0)
  const [Mintemp, setMinTemp] = useState(0)
  const [wspeed, setWspeed] = useState(0)
  const [conditions, setConditions] = useState('')

  useEffect(() => {
    api();
  }, [])

 
  const ref = useRef()

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
    setConditions(data.days[0].conditions)
  }

  const changeHandler = (e) => {
    setPlace(e.target.value)
    console.log(e.target.value)

  }

  
  const changeBg=() => {
    if(conditions.includes("Rain")){
      ref.current.src="/public/rainy.jpg"
    }else if( conditions.includes("Partially cloudy")){
 ref.current.src="/public/cloudy.jpg"
    }
    if(conditions.includes("Clear")){
      ref.current.src="/public/sunny.jpg"
    }
    if(conditions.includes("Snow")){
      ref.current.src="/public/snowy.jpg"
    }
    // if(conditions.includes("cloudy")){
    //   ref.current.src="/public/cloudy.jpg"
    // }
  }

  useEffect(() => {
    changeBg()
  }, [conditions])
  return (
    <>
    <div className='main-box'   >
      <img ref={ref} src="/public/sunny.jpg" alt="" className=' flex md:w-[100%] md:h-[100%] md:mt-0 h-[50%] absolute -z-10 mt-[200px] ' />

    <Navbar />

<div className='w-[100vw] flex justify-center min-h-[200px] items-center'>
  <input onChange={changeHandler} type="text" name='place' className='border border-black w-[250px] px-2 py-1 md:w-[300px] rounded-lg' />
  <button className='bg-violet-300 px-3 py-1 rounded-xl mx-2' onClick={api}>submit</button>
</div>
<div className='mx-auto my-20 w-fit min-h-[200px] flex-col justify-center gap-4 items-center md:text-xl text-md text-white font-bold md:block gap-y-3'>
  
    <p className='my-2'>Location: {location}</p>
    <p className='my-2'>humidity: {humidity}</p>
    <p className='my-2'>Current temperature: {temp}</p>
    <p className='my-2'>Max temperature: {Maxtemp}</p>
    <p className='my-2'>Min temperature: {Mintemp}</p>
    <p className='my-2'>Wind Speed: {wspeed}</p>
    <p className='my-2'>Condition: {conditions}</p>




</div>
<Footer />

    </div>
    
    </>
  )
}

export default App
