import React, { useContext } from 'react';
import Navbar from './Navbar';
import Albumitem from './Albumitem';
import Songitem from './Songitem';
import { PlayerContext } from '../context/PlayerContext';

const DisplayingHome = () => {
  const { songsData, albumsData } = useContext(PlayerContext);

  return (
    <>
      <Navbar />
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Featured Charts</h1>
        <div className="flex overflow-auto">
          {albumsData.map((item) => (
            <Albumitem
              key={item._id}
              image={item.image}
              name={item.name}
              desc={item.desc}
              id={item._id}
            />
          ))}
        </div>
      </div>
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Today's biggest hits</h1>
        <div className="flex overflow-auto">
          {songsData.map((item) => (
            <Songitem
              key={item._id}
              name={item.name}
              desc={item.desc}
              image={item.image}
              id={item._id}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default DisplayingHome;
