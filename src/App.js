
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot} from '@fortawesome/free-solid-svg-icons';
import { GoogleMap, useJsApiLoader, DirectionsRenderer} from '@react-google-maps/api';
import { useRef, useState } from 'react';

function App() {

  const center = {lat:19.0760,lng:72.8777}

  const {isLoaded} = useJsApiLoader({
    googleMapsApiKey : process.env.GOOGLE_MAPS_API_KEY,
    libraries: ['places']
  })

  const[directionResponse,setDirectionResponse]=useState(null)
  const[distance,setDistance]=useState('')
  const [originPlace,setOriginPlace] = useState("")
  const [destinationPlace,setDestinationPlace] = useState("")
  const originRef = useRef()
  const destinationRef = useRef()

  async function calculateRoute() {
    if(originRef.current.value === '' || destinationRef.current.value === ''){
      return
    }
    //eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService()
    const result = await directionsService.route({
      origin : originRef.current.value,
      destination : destinationRef.current.value,
      //eslint-disable-next-line no-undef
      travelMode : google.maps.TravelMode.DRIVING
    })

    setDirectionResponse(result);
    setDistance(result.routes[0].legs[0].distance.text)
    console.log(distance);
  }


  return (
    <div className='app'>

      <nav className='navbar'>
        <img src="logo.png" alt="logo" />
      </nav>

      <div className="body">

        <div className='text'>Let's calculate <strong>distance</strong> from Google maps</div>

        <div className='main-div'>

          <div className='div-I'>

            <div className='div-II'>

              <div className='div-III'>
                <div className='input-form'>
                  <p>Origin</p>
                  <div className='origin'>
                    <FontAwesomeIcon style={{color:"red"}} icon={faLocationDot} />
          
                      <input type="text" placeholder='origin' ref={originRef} onChange={e => setOriginPlace(e.target.value)}/>
                    
                  </div>
                  <p>Destination</p>
                  <div className='destination'>
                    <FontAwesomeIcon style={{color:"red"}} icon={faLocationDot} />
            
                      <input type="text" placeholder='destination' ref={destinationRef}  onChange={e => setDestinationPlace(e.target.value)}/>
                    
                  </div>
                </div>
              </div>

              <div>
                <button onClick={calculateRoute}>Calculate</button>
              </div>

            </div>

            <div className='output'>
              <div style={{backgroundColor:"white"}} className='distance'>
                <div style={{fontSize:"2.55vh",fontFamily:"Work Sans",marginLeft:"1.8vw",marginTop:"3.8vh"}} >Distance</div>
                <div style={{fontSize:"4vh",fontFamily:"Work Sans",color:"#0079FF",marginLeft:"20vw",marginTop:"2.9vh"}}><b>{distance}</b></div>
              </div>

              <div style={{fontSize:"1.5vh",fontFamily:"Work Sans",marginLeft:"1.8vw",marginTop:"4.2vh"}}>The distance between <strong>{originPlace}</strong> and <strong>{destinationPlace}</strong> is <strong>{distance}</strong>.</div>
            </div>
            
          </div>

          <div>
            <div className='map'>
              {isLoaded && <GoogleMap 
                              center={center} 
                              zoom={15} 
                              mapContainerStyle={{width:'100%',height:'100%'}}
                              options={{
                                zoomControl:false,
                                streetViewControl:false,
                                mapTypeControl:false,
                                fullscreenControl:false
                              }}
                            >
                              {directionResponse && <DirectionsRenderer directions={directionResponse}/>}
                            </GoogleMap>}
              
            </div>
          </div>

        </div>

      </div>
 
    </div>
  );
}

export default App;
