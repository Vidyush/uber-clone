import React, { useEffect, useState } from 'react'
import tw from 'tailwind-styled-components/dist/tailwind'
import { carList } from '../../data/carList'


const RideSelector = ({pickup,dropOff}) => {
    const [rideDuration,setRideDuration] = useState("")
    
    useEffect(()=>{
        rideDuration = fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${pickup[0]},${pickup[1]};${dropOff[0]},${dropOff[1]}?access_token=pk.eyJ1IjoidmlkeXVzaCIsImEiOiJja3ZseHYyNW0yd2RyMm9tbGplaDMzNTZoIn0.WQthA2MNcF5D1j3PUImYdA`)
        .then(res => res.json())
        .then(data =>{
            setRideDuration(data.routes[0].duration/100)
        })
    },[pickup,dropOff])
    return (
        <Wrapper>
            <Title>Choose a Ride or swipe up for more....</Title>
            <CarList>
                {carList?.map((car, index)=>(
                    <Car key={index}>
                        <CarImg src={car.imgUrl}/>
                        <CarDetails>
                            <Service>{car.service}</Service>
                            <Time>5 min away</Time>
                        </CarDetails>
                        <CarPrice>{"Rs"+(rideDuration*car.multiplier).toFixed(2)}</CarPrice>
                    </Car>
                ))}
            </CarList>
        </Wrapper>
    )
}

const Wrapper = tw.div`
flex-1 overflow-y-scroll flex flex-col
`
const Title = tw.div`
text-center py-2 border-b text-gray-500 text-xs
`
const CarList = tw.div`
overflow-y-scroll
`
const CarImg = tw.img`
h-14 w-12 rounded-full border border-grey-200 p-px mr-2
`
const Car = tw.div`
flex p-4 items-center
`
const CarDetails = tw.div`
flex-1
`
const CarPrice = tw.div`
text-sm
`
const Service = tw.div`
font-medium
`
const Time = tw.div`
text-blue-500 text-xs
`

export default RideSelector
