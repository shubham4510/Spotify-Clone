import {v2 as cloudinary} from 'cloudinary'
import songModel from '../models/songModel.js';

const addSong = async (req,res) => {
    try {
        const name = req.body.name;
        const desc = req.body.desc;
        const album = req.body.album;
        const audioFile = req.files.audio[0];
        const imageFile = req.files.image[0];
        const audioUpload = await cloudinary.uploader.upload(audioFile.path,{resource_type:"auto"});
        const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:"auto"});
        const duration = `${Math.floor(audioUpload.duration/60)}:${Math.floor(audioUpload.duration%60)}`

        const songData = {
            name,
            desc,
            album,
            image:imageUpload.secure_url,
            file: audioUpload.secure_url,
            duration,
        }

        const song = songModel(songData);
        await song.save();
        
        return res.status(200).json({
            success:true,
            message:"Song Added",
        })


    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Data cannot be uploaded on cloudinary",
            error:error.message,
        })
    }
}

const listSong = async (req,res) => {
    try {
        const allSongs = await songModel.find();
        return res.status(200).json({
            success:true,
            songs:allSongs,
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

const removeSong = async (req,res) => {
    try {
        await songModel.findByIdAndDelete(req.body.id);
        return res.status(200).json({
            success:true,
            message:"Song removed",
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


export {addSong,listSong,removeSong};