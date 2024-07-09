import React from 'react'
import { assets } from '../assets/admin-assets/assets'

const AddSong = () => {
  return (
    <form className=' flex flex-col items-start gap-8 text-gray-800'>
      <div className=" flex gap-8">
        <div className="flex flex-col gap-4">
          <p>Upload song</p>
          <input type="file" id='song' accept='audio/*' hidden  />
          <label htmlFor="song">
            <img src={assets.upload_song} className=' w-24 cursor-pointer' alt="" />
          </label>
        </div>
        <div className=" flex flex-col gap-4">
          <p>Upload Image</p>
          <input type="file" id='image' accept='image/*' hidden />
          <label htmlFor="image">
            <img src={assets.upload_area} className=' w-24 cursor-pointer' alt="" />
          </label>
        </div>
      </div>

      <div className=" flex flex-col gap-8">
      <div className="flex flex-col gap-2.5">
  <p>Song name</p>
  <input type="text" className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]" placeholder="Type Here" required id="song-name" />
</div>

<div className="flex flex-col gap-2.5">
  <p>Song description</p>
  <input type="text" className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]" placeholder="Type Here" required id="song-description" />
</div>

<div className="flex flex-col gap-2.5">
  <p>Album</p>
  <select className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]" id="album">
    <option value="none">None</option>
  </select>
</div>

      </div>
    </form>
  )
}

export default AddSong