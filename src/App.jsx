/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from 'react'
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
  const [songs, setSongs] = useState([])
  const [mood, setmood] = useState("")

  useEffect(() => {
    api();
    song()


  }, [])


  useEffect(() => {
    // Log songs whenever they change
    console.log('Updated songs:', songs);
  }, [songs]);

  const song = async () => {
    let response;
    let res;

    try {
      if (conditions.includes("Rain")) {
        response = await fetch(`http://localhost:3000/rainy`);
        setmood("rainy");
      } else if (conditions.includes("Partially cloudy")) {
        response = await fetch(`http://localhost:3000/cloudy`);
        setmood("cloudy");
      } else if (conditions.includes("Clear")) {
        response = await fetch(`http://localhost:3000/sunny`);
        setmood("sunny");
      } else if (conditions.includes("Snow")) {
        response = await fetch(`http://localhost:3000/snowy`);
        setmood("snowy");
      } else {
        response = await fetch(`http://localhost:3000/sunny`);
        setmood("sunny");
      }

      const text = await response.text();
      try {
        res = JSON.parse(text);
      } catch (error) {
        console.error('Failed to parse JSON:', error, 'Response text:', text);
        res = [];
      }

      setSongs(res);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  useEffect(() => {
    song();
  }, [conditions]);

  useEffect(() => {
    // console.log('Updated songs:', songs);
  }, [songs]);

  useEffect(() => {
    //console.log('Updated mood:', mood);
  }, [mood]);



  const ref = useRef()

  const api = async () => {
    // const req = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${place}?unitGroup=metric&key=HLKNA9VH887J5ENCJBR9G4ZU4&contentType=json`, { method: "GET" })
    const req = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${place}?unitGroup=metric&key=PBRMVXER4PVHHPCFBV438M925&contentType=json`, { method: "GET" })
    const data = await req.json()


    // console.log(data)
    //console.log(data.currentConditions.humidity)
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
    // console.log(e.target.value)

  }


  const changeBg = () => {
    if (conditions.includes("Rain")) {
      ref.current.src = "/rainy.png"

    } else if (conditions.includes("Partially cloudy")) {
      ref.current.src = "/cloudy.png"


    }
    if (conditions.includes("Clear")) {
      ref.current.src = "/sunny.png"


    }
    if (conditions.includes("Snow")) {
      ref.current.src = "/snowy.png"


    }
    // if(conditions.includes("cloudy")){
    //   ref.current.src="/public/cloudy.jpg"
    // }
  }


  useEffect(() => {
    changeBg()
  }, [conditions])

  var audioSrc = `/songs/${mood}/${songs[0]}`;
  console.log(audioSrc);


  return (
    <>
      <div className='main-box'   >
        <img ref={ref} src="/sunny.png" alt="" className=' flex md:w-[100%] md:h-[100%] md:mt-0 h-[45%] absolute -z-10 mt-[220px] ' />

        <Navbar />

        <div className='w-[100vw] flex justify-center min-h-[200px] items-center'>
          <input onChange={changeHandler} type="text" name='place' className='border border-black w-[250px] px-2 py-1 md:w-[300px] rounded-lg' />
          <button className='bg-violet-300 px-3 py-1 rounded-xl mx-2' onClick={api}>submit</button>
        </div>
        <div className='mx-auto my-auto w-fit min-h-[200px] flex-col justify-center gap-4 items-center md:text-xl text-md text-white font-bold md:block gap-y-3'>

          <p className='my-2'>Location: {location}</p>
          <p className='my-2'>humidity: {humidity}</p>
          <p className='my-2'>Current temperature: {temp}</p>
          <p className='my-2'>Max temperature: {Maxtemp}°C</p>
          <p className='my-2'>Min temperature: {Mintemp}°C</p>
          <p className='my-2'>Wind Speed: {wspeed}</p>
          <p className='my-2'>Condition: {conditions}</p>

        </div>
        <div className="mt-10 w-full bg-orange-500 flex flex-col items-center justify-center h-fit">
          <div className='text-white font-extrabold'>SONGS FOR YOU</div>
          {/* {
            songs.map((item,index)=>(
              <div key={index} className="relative bg-red-600 w-[60%] min-h-[100px] max-h-fit flex flex-col items-center justify-evenly">
              <audio controls src={item}></audio>
            </div>
            ))
          } */}
        <div  className="relative bg-red-600 w-[60%] min-h-[100px] max-h-fit flex flex-col items-center justify-evenly mx-auto">
              <audio controls src={audioSrc}></audio>
            </div>
        </div>


        <Footer />

      </div>

    </>
  )
}

export default App
