import { v2 as cloudinary } from 'cloudinary';
import songModel from '../models/songModel.js';
import multer from 'multer';

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const addSong = async (req, res) => {
  try {
    const { name, desc, album } = req.body;
    const audioFile = req.files.audio[0];
    const imageFile = req.files.image[0];

    // Upload audio to Cloudinary
    const audioUpload = await cloudinary.uploader.upload(audioFile.path, { resource_type: "auto" });
    // Upload image to Cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "auto" });

    // Calculate duration
    const duration = `${Math.floor(audioUpload.duration / 60)}:${Math.floor(audioUpload.duration % 60)}`;

    // Prepare song data
    const songData = {
      name,
      desc,
      album,
      image: imageUpload.secure_url,
      file: audioUpload.secure_url,
      duration,
    };

    // Save song to database
    const song = new songModel(songData);
    await song.save();

    return res.status(200).json({
      success: true,
      message: "Song Added",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Data cannot be uploaded on cloudinary",
      error: error.message,
    });
  }
};

const listSong = async (req, res) => {
  try {
    const allSongs = await songModel.find();
    return res.status(200).json({
      success: true,
      songs: allSongs,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const removeSong = async (req, res) => {
  try {
    await songModel.findByIdAndDelete(req.body.id);
    return res.status(200).json({
      success: true,
      message: "Song removed",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { addSong, listSong, removeSong };
