import React, { useEffect, useRef ,useContext} from 'react'
import { Routes,Route, useLocation } from 'react-router-dom'
import DisplayingHome from './DisplayingHome'
import DisplayAlbum from './DisplayAlbum'
import { PlayerContext } from '../context/PlayerContext'

const Display = () => {

  const { songsData, albumsData } = useContext(PlayerContext);
  const displayRef = useRef();
  const location = useLocation();
  const isAlbum = location.pathname.includes("album");
  const albumId = isAlbum ? location.pathname.split('/').pop() : "";
  const album = albumsData.find(album => album._id === albumId);
  const bgColor = album ? album.bgColor : "#121212";

  useEffect(() => {
    if(isAlbum){
      displayRef.current.style.background = `linear-gradient(${bgColor},#121212)`
    }
    else{
      displayRef.current.style.background = `#121212`
    }
  })

  return (
    <div ref={displayRef} className=' w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:left-0'>
        <Routes>
            <Route path='/' element={<DisplayingHome/>}/>
            <Route path='/album/:id' element={<DisplayAlbum/>}/>
        </Routes>
    </div>
  )
}

export default Display