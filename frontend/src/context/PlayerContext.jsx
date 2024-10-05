import { createContext, useEffect, useRef, useState } from "react";
import axios from 'axios';

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
    const audioRef = useRef(null);  // Initialize audioRef as null
    const seekBg = useRef(null);
    const seekBar = useRef(null);

    const url = 'http://localhost:4000';

    const [songsData, setSongsData] = useState([]);
    const [albumsData, setAlbumsData] = useState([]);

    const [track, setTrack] = useState(null);  // Initialize as null
    const [playStatus, setPlayStatus] = useState(false);
    const [time, setTime] = useState({
        currentTime: { second: 0, minute: 0 },
        totalTime: { second: 0, minute: 0 },
    });
    useEffect(() => {
        const handleTimeUpdate = () => {
            if (audioRef.current && !isNaN(audioRef.current.duration)) {
                const currentTime = audioRef.current.currentTime;
                const duration = audioRef.current.duration;
    
                seekBar.current.style.width = (Math.floor(currentTime / duration * 100)) + "%";
                setTime({
                    currentTime: {
                        second: Math.floor(currentTime % 60),
                        minute: Math.floor(currentTime / 60),
                    },
                    totalTime: {
                        second: Math.floor(duration % 60),
                        minute: Math.floor(duration / 60),
                    }
                });
            }
        };
    
        audioRef.current.ontimeupdate = handleTimeUpdate;
    
        return () => {
            audioRef.current.ontimeupdate = null; // Cleanup event listener
        };
    }, [audioRef, track]);  // Include track in dependency array to update on track change
    
    // Play Function
    const play = () => {
        if (audioRef.current) {
            audioRef.current.play();
            setPlayStatus(true);
        }
    };

    // Pause Function
    const pause = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            setPlayStatus(false);
        }
    };

    // Play with Name
    const playWithName =  (name) => {
        const selectedTrack = songsData.find((item) => name === item.name);
        
        if (selectedTrack) {
            setTrack(selectedTrack);
            
            if (audioRef.current) {
                audioRef.current.load();  // Load the new track
    
                // Wait for the metadata to load before playing
                audioRef.current.onloadedmetadata = () => {
                    audioRef.current.play()
                        .then(() => setPlayStatus(true))
                        .catch((error) => console.error('Error playing audio:', error));
                };
            }
        }
    };

    // Previous Track
    const previous = () => {
        const currentIndex = songsData.findIndex((item) => track && track._id === item._id);
        if (currentIndex > 0) {
            const prevTrack = songsData[currentIndex - 1];
            setTrack(prevTrack);
            if (audioRef.current) {
                audioRef.current.play();
                setPlayStatus(true);
            }
        }
    };

    // Next Track
    const next = () => {
        const currentIndex = songsData.findIndex((item) => track && track._id === item._id);
        if (currentIndex < songsData.length - 1) {
            const nextTrack = songsData[currentIndex + 1];
            setTrack(nextTrack);
            if (audioRef.current) {
                audioRef.current.play();
                setPlayStatus(true);
            }
        }
    };

    // Seek Song
    const seekSong = (e) => {
        if (audioRef.current) {
            audioRef.current.currentTime = (e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration;
        }
    };

    // Fetch Songs Data
    const getSongsData = async () => {
        try {
            const response = await axios.get(`${url}/api/song/list`);
            const songs = response?.data?.songs || [];
            setSongsData(songs);
            if (songs.length > 0) {
                setTrack(songs[0]);  // Set first track initially
            }
        } catch (error) {
            console.error("Error fetching songs data:", error.message);
        }
    };

    // Fetch Albums Data
    const getAlbumsData = async () => {
        try {
            const response = await axios.get(`${url}/api/album/list`);
            setAlbumsData(response.data.allAlbums);
        } catch (error) {
            console.error("Error fetching albums data:", error.message);
        }
    };

    // Handle Time Update
    useEffect(() => {
        const handleTimeUpdate = () => {
            if (audioRef.current) {
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
            }
        };

        if (audioRef.current) {
            audioRef.current.ontimeupdate = handleTimeUpdate;
        }

        // Cleanup event listener on component unmount
        return () => {
            if (audioRef.current) {
                audioRef.current.ontimeupdate = null;
            }
        };
    }, [track]);  // Track changes re-trigger effect

    // Fetch data on mount
    useEffect(() => {
        getSongsData();
        getAlbumsData();
    }, []);

    // Context Value
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
        playWithName,
        previous,
        next,
        seekSong,
        songsData,
        albumsData,
    };

    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    );
};

export default PlayerContextProvider;
