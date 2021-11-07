import React from 'react'
import tw from "tailwind-styled-components"
import mapboxgl from "mapbox-gl"
import { useEffect } from 'react'

mapboxgl.accessToken = 
"pk.eyJ1IjoidmlkeXVzaCIsImEiOiJja3ZseHYyNW0yd2RyMm9tbGplaDMzNTZoIn0.WQthA2MNcF5D1j3PUImYdA"
const Map = (props) => {
  useEffect(()=>{
    // if(map.current) return;
    const maps = new mapboxgl.Map({
      container:'maps',
      style: 'mapbox://styles/drakosi/ckvcwq3rwdw4314o3i2ho8tph',
      center: [-99.29011, 39.39172],
      zoom: 3,
    })
    
    if(props.pickup){

      const marker = new mapboxgl.Marker()
      .setLngLat(props.pickup)
      .addTo(maps);
    
    }
    if (props.dropOff) {
      const marker = new mapboxgl.Marker()
      .setLngLat(props.dropOff)
      .addTo(maps);
    }
    if(props.pickup && props.dropOff){
      maps.fitBounds([
        props.pickup,
        props.dropOff
      ],{
        padding:60
      })
    }
  }, [props.pickup,props.dropOff]);
  
    return (
        <Wrapper id="maps">
            
        </Wrapper>
    )
}

const Wrapper = tw.div`
flex-1 h-1/2
`

export default Map
