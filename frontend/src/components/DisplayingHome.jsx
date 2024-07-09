import React from 'react'
import Navbar from './Navbar'
import { albumsData, songsData } from '../assets/frontend-assets/assets'
import Albumitem from './Albumitem'
import Songitem from './Songitem'

const DisplayingHome = () => {
  return (
    <>
    <Navbar/>
    <div className=" mb-4">
      <h1 className=' my-5 font-bold text-2xl'>Featured Charts</h1>
      <div className="flex overflow-auto">
      {
        albumsData.map((item,index)=>(<Albumitem key={index} image={item.image} name={item.name} desc={item.desc} id={item.id}/>))
      }
      </div>
     
    </div>
    <div className=" mb-4">
      <h1 className=' my-5 font-bold text-2xl'>Today's biggest hits</h1>
      <div className="flex overflow-auto">
      {
        songsData.map((item,index)=>(<Songitem key={index} name={item.name} desc={item.desc} image={item.image} id={item.id}/>))
      }
      </div>
     
    </div>
    </>
  )
}

export default DisplayingHome