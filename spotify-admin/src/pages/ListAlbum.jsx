import React, { useEffect, useState ,useCallback} from "react";
import { url } from "../App";
import { toast } from "react-toastify";
import axios from "axios";

const ListAlbum = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false)

  const fetchAlbum = useCallback(async () => {
    try {
      const response = await axios.get(`${url}/api/album/list`);
      if (response.data.success) {
        setData(response.data.allAlbums);
      } else {
        toast.error("Failed to fetch albums");
      }
    } catch (error) {
      setError(error.message);
      toast.error("Error occurred while fetching albums");
    } finally {
      setLoading(false);
    }
  }, []);

  const removeAlbum = async (id) => {
    try {
      const response = await axios.delete(`${url}/api/album/remove`, { data: { id } });
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchAlbum(); // Refresh the list after removing an album
      }
    } catch (error) {
      toast.error("Error occurred while removing album");
    }
  };
  


  useEffect(() => {
    fetchAlbum();
  }, [fetchAlbum]);

  return (
    <div>
    <p>All Albums List</p>
    <div className="sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100">
      <b>Image</b>
      <b>Name</b>
      <b>Description</b>
      <b>Album Color</b>
      <b>Action</b>
    </div>
    {data.map((item,index) => (
      <div key={index} className="grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border-red-300 text-sm mr-5">
        <img src={item.image} className="w-12" alt={item.name} />
        <p>{item.name}</p>
        <p>{item.desc}</p>
        <input type="color" value={item.bgColor} readOnly />
        <p onClick={() => removeAlbum(item._id)} className="cursor-pointer">x</p>
      </div>
    ))}
  </div>
  );
};

export default ListAlbum;
