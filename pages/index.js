// import Head from 'next/head'
import tw from "tailwind-styled-components"
import Map from './components/Map'
import {useEffect,useState} from 'react'
import {auth} from '../firebase'
import { onAuthStateChanged,signOut } from "@firebase/auth"
import router, {useRouter} from 'next/router'
import Link from 'next/link'

export default function Home() {

  const [user,setUser] = useState(null)
  const router = useRouter()

  useEffect(()=>{
    return onAuthStateChanged(auth,user=>{
      if(user){
        setUser({
          name: user.displayName,
          photoUrl: user.photoURL,
        })
      }
      else{
        setUser(null)
        router.push('/login')
      }
    })
  })
  
  return (
    <Wrapper>
        <Map />
        <ActionItemss>
            {/* Header */}
            <Header>
                <Logo src="https://i.ibb.co/84stgjq/uber-technologies-new-20218114.jpg"/>
                <Profile>
                    <Name>{user && user.name}</Name>
                    <UserImage src={user && user.photoUrl} onClick={()=>{signOut(auth)}} />
                </Profile>
            </Header>
            {/* actionbuttons */}
            <ActionButtons>
                <Link href="/search" passHref={true}>
                    <ActionButton><ActionButtonImage src="https://i.ibb.co/Xx4G91m/uberblack.png" />Ride</ActionButton>
                </Link>
                    <ActionButton><ActionButtonImage src="https://i.ibb.co/n776JLm/bike.png" />Wheel</ActionButton>
                    <ActionButton><ActionButtonImage src="https://i.ibb.co/5RjchBg/uberschedule.png" />Reserve</ActionButton>
            </ActionButtons>
            {/* inputbuttons */}
            <InputButton>
                Where to?
            </InputButton>
        </ActionItemss>
    </Wrapper>
  )
}

const Wrapper = tw.div`
  flex flex-col h-screen
`
const ActionItemss = tw.div`
flex-1 p-4
`
const Header = tw.div`
flex justify-between items-center
`
const ActionButtons = tw.div`
flex
`
const InputButton = tw.div`
h-18 bg-gray-200 text-2xl p-4 flex items-center mt-8 rounded-lg
`
const ActionButton = tw.div`
bg-gray-200 flex-1 m-1 h-28 flex items-center justify-content 
flex-col rounded-lg transform hover:scale-105 transition text-xl
`
const Profile = tw.div`
flex items-center 
`
const Name = tw.div`
mr-4 w-18
`
const UserImage = tw.img`
h-12 w-12 rounded-full border border-grey-200 p-px cursor-pointer
`
const Logo = tw.img`
h-16
`
const ActionButtonImage = tw.img`
h-3/5
`

