import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { url } from '../App';
import { toast } from 'react-toastify';

const ListSong = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSongs = async () => {
    try {
      const response = await axios.get(`${url}/api/song/list`);

      if (response.data.success) {
        setData(response.data.songs);
      } else {
        toast.error("Failed to fetch songs");
      }
    } catch (error) {
      toast.error("Error occurred");
    } finally {
      setLoading(false);
    }
  };

  const removeSong = async (id) => {
    try {
      const response = await axios.delete(`${url}/api/song/remove`, {
        data: { id }
      });

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchSongs();
      } else {
        toast.error("Failed to remove song");
      }
    } catch (error) {
      toast.error("Error occurred");
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="grid place-items-center min-h-[80vh]">
          <div className="w-16 h-16 place-self-center border-4 border-gray-800 border-t-green-800 rounded-full animate-spin"></div>
        </div>
      ) : (
      <div className="">
        <p>All Songs List</p>
        <br />
        <div>
          <div className=" sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100">
            <b>Image</b>
            <b>Name</b>
            <b>Album</b>
            <b>Duration</b>
            <b>Action</b>
          </div>
          {
            data.map((item,index)=>{
              return (
                <div className=" grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5" key={index}>
                  <img src={item.image} className=' w-12' alt="" />
                  <p>{item.name}</p>
                  <p>{item.album}</p>
                  <p>{item.duration}</p>
                  <p className=' cursor-pointer' onClick={() => removeSong(item._id)}>x</p>
                </div>
              )
            })
          }
        </div>
      </div>
      )}
    </div>
  );
};

export default ListSong;
