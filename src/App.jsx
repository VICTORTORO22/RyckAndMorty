
import { useEffect, useRef, useState } from 'react'
import './App.css'
import useFetch from './hooks/useFetch'
import getRandomNumber from './services/getRandomNumber'
import LocationInfo from './components/LocationInfo'
import ResidentCard from './components/ResidentCard'
import photos from './data/photos.json'
import getRandom from './utils/randomNumberFondo'





function App() {

  const [locationId, setLocationId] = useState(getRandomNumber(126))

  const url = `https://rickandmortyapi.com/api/location/${locationId}`
  const [ location, getLocation, hasError] = useFetch(url)
  const [imageNumber, setImageNumber] = useState(photos[getRandom(photos.length)])


  

  useEffect(() => {
    getLocation()
  }, [locationId])
  console.log(location)

  const inputId = useRef()

  const handleSubmit = e => {
    e.preventDefault()
    setLocationId(inputId.current.value.trim())
    setImageNumber(photos[getRandom(photos.length)])

  }



  return (
    
    <div>
      <img className='image__app' src={`../image/fondo${imageNumber}.jpg`} alt="" />
      <h1 className='title'>Ryck And Morty</h1>
      <form onSubmit={handleSubmit}>
        <input id='inputText' ref={inputId} type="text" />
        <button className='button__one'>Search</button>
      </form> 
      {
        hasError
        ? <h2>Hey, you must provide id 1 to 126</h2>
        :(
          <>
            
            <LocationInfo
            location = {location}
            
            />
            <div className='card__container'>
              {
                location?.residents.map( url => (
                  <ResidentCard
                    key={url}
                    url={url}
                  
                  />
                ) )
              }
              
            </div>
            
          
          </>
        )
      }
      
     
    </div>

  )
}

export default App
