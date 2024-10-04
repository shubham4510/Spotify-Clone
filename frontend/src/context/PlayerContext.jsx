import { createContext, useEffect, useRef, useState } from "react";
import axios from 'axios';

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef();

    const url = 'http://localhost:4000';

    const [songsData, setSongsData] = useState([]);
    const [albumsData, setAlbumsData] = useState([]);

    const [track, setTrack] = useState([]);
    const [playStatus, setPlayStatus] = useState(false);
    const [time, setTime] = useState({
        currentTime: {
            second: 0,
            minute: 0
        },
        totalTime: {
            second: 0,
            minute: 0,
        }
    });

    const play = () => {
        audioRef.current.play();
        setPlayStatus(true);
    };

    const pause = () => {
        audioRef.current.pause();
        setPlayStatus(false);
    };

    const playWithId = async (id) => {
        await setTrack(songsData[id]);
        await audioRef.current.play();
        setPlayStatus(true);
    };

    const previous = async () => {
        if (track.id > 0) {
            await setTrack(songsData[track.id - 1]);
            await audioRef.current.play();
            setPlayStatus(true);
        }
    };

    const next = async () => {
        if (track.id < songsData.length - 1) {
            await setTrack(songsData[track.id + 1]);
            await audioRef.current.play();
            setPlayStatus(true);
        }
    };

    const seekSong = (e) => {
        audioRef.current.currentTime = (e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration;
    };

    const getSongsData = async () => {
        try {
            const response = await axios.get(`${url}/api/song/list`);
            setSongsData(response?.data?.songs);
            setTrack(response.data.songs[0]);
        } catch (error) {
            console.log(error.message)
        }
    }

    const getAlbumsData = async () => {
        try {
            const response = await axios.get(`${url}/api/album/list`);
            setAlbumsData(response.data.allAlbums);
        } catch (error) {
        }
    }

    useEffect(() => {
        const handleTimeUpdate = () => {
            seekBar.current.style.width = (Math.floor(audioRef.current.currentTime / audioRef.current.duration * 100)) + "%";
            setTime({
                currentTime: {
                    second: Math.floor(audioRef.current.currentTime % 60),
                    minute: Math.floor(audioRef.current.currentTime / 60),
                },
                totalTime: {
                    second: Math.floor(audioRef.current.duration % 60),
                    minute: Math.floor(audioRef.current.duration / 60),
                }
            });
        };

        audioRef.current.ontimeupdate = handleTimeUpdate;

        return () => {
            audioRef.current.ontimeupdate = null; // Cleanup event listener
        };
    }, [audioRef]);

    useEffect(() => {
        getSongsData();
        getAlbumsData();
    }, []);

    const contextValue = {
        audioRef,
        seekBar,
        seekBg,
        track,
        setTrack,
        playStatus,
        setPlayStatus,
        time,
        setTime,
        play,
        pause,
        playWithId,
        previous,
        next,
        seekSong,
        songsData,
        albumsData
    };

    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    );
};

export default PlayerContextProvider;
