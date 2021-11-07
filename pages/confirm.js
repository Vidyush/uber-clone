import React, { useEffect, useState } from 'react'
import tw from "tailwind-styled-components"
import Link from "next/link"
import {useRouter} from "next/router"
import Map from './components/Map'
import RideSelector from './components/RideSelector'

const Confirm = () => {
    
    const router = useRouter();
    const { pickUp, dropOff } = router.query;
    const [pick, setPick] = useState();
    const [drop, setDrop] = useState();
    const getPickupCordinate = (pickUp) =>{
        
        const token = "pk.eyJ1IjoidmlkeXVzaCIsImEiOiJja3ZseHYyNW0yd2RyMm9tbGplaDMzNTZoIn0.WQthA2MNcF5D1j3PUImYdA";
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${pickUp}.json?` + 
        new URLSearchParams({
            access_token:token,
            limit:1
        })
        )
        .then(res => res.json())
        .then(data =>{
            setPick(data.features[0].center);
            
        })
    }

    const getDropofCordinate = (dropOff) =>{
        
        const token = "pk.eyJ1IjoidmlkeXVzaCIsImEiOiJja3ZseHYyNW0yd2RyMm9tbGplaDMzNTZoIn0.WQthA2MNcF5D1j3PUImYdA";
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${dropOff}.json?` + 
        new URLSearchParams({
            access_token:token,
            limit:1
        })
        )
        .then(res => res.json())
        .then(data =>{
            setDrop(data.features[0].center);
            
        })
    }

    useEffect(()=>{
        getPickupCordinate(pickUp);
        getDropofCordinate(dropOff);
      
    },[])

    
    return (
        <Wrapper>
            {/* Buttons */}
            <ButtonContainer>
                <Link href="/search" passHref={true}>
                    <BackButton src="https://img.icons8.com/ios-filled/50/000000/left.png" />
                </Link>
            </ButtonContainer>
            <Map
                pickup={pick}
                dropOff={drop}
            />
            <RidesContainer>
                <RideSelector />
                <ConfirmButtonContainer>
                    Confirm LocberX
                </ConfirmButtonContainer>
            </RidesContainer>
        </Wrapper>
    )
}

const Wrapper = tw.div`
flex flex-col h-screen bg-gray-200
`
const RidesContainer = tw.div`
flex-1 flex flex-col h-1/2
`
const ButtonContainer = tw.div`
fixed bg-white rounded-full top z-10 
top-1 left-1 shadow-lg
`
const BackButton = tw.img`
h-8 cursor-pointer hover:scale-105 transition text-xl
`
const ConfirmButtonContainer = tw.button`
border-t-2
bg-black text-white flex flex-col 
items-center m-2 p-2 rounded-full
cursor-pointer hover:bg-gray-400 transition
`
export default Confirm
