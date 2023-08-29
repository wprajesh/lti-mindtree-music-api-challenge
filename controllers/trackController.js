// controllers/trackController.js
const axios = require('axios');
const { Sequelize } = require('sequelize');
const { Track, Artist } = require('../models/track');

// Fetch data from Spotify API and store in the database
async function createTrack(req, res) {
  
  const isrc = req.body.isrc;

  try {
    // Obtain an access token from Spotify each time, as it is ok from the assignment
    const authResponse = await axios.post('https://accounts.spotify.com/api/token', null, {
        params: {
            grant_type: 'client_credentials'
        },
        auth: {
            username: process.env.CLIENT_ID,
            password: process.env.CLIENT_SECRET
        }
        });
    
    const accessToken = authResponse.data.access_token;
    console.log("Accesssss "+accessToken)

    // Fetch track metadata from Spotify API
    const spotifyResponse = await axios.get(`https://api.spotify.com/v1/search?q=isrc:${isrc}&type=track`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    console.log("img url")
    console.log(spotifyResponse.data.tracks.items[0].album.images[0].url)
    if (spotifyResponse.data.tracks.items.length > 0 ) {
        let popularity = 0
        let trackData
        spotifyResponse.data.tracks.items.forEach(element => {
            if (element.popularity > popularity) {
                trackData = element
            }
        });
        console.log("TTT")
        console.log(trackData)
        let artists = []
        trackData.artists.forEach(artist => {
            artists.push({name: artist.name})
        });
        try{
            // Create a new track record in the database
            const newTrack = await Track.create({
            isrc: isrc,
            title: trackData.name,
            Artists: artists,
            spotifyImageURI: trackData.album.images[0].url
            },
            {
                include: Artist // Include the association
            }
            );
            res.status(201).json(newTrack);
        } catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                // Handle duplicate entry error
                res.status(400).json({ error: 'Hey, You are trying to add same data. I have handeled Duplicate entry 🤓' });
              } else {
                console.error(error);
                res.status(500).json({ error: 'Internal server error' });
              }
        }
    } else {
        res.status(200).json({"msg": "No Track found for given ISRC"});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Retrieve track metadata by ISRC
async function getTrackByISRC(req, res) {

  const isrc = req.params.isrc;

  try {
    // Find the track by ISRC in the database
    const track = await Track.findOne({
      where: { isrc }
    });

    if (track) {
      res.status(200).json(track);
    } else {
      res.status(404).json({ error: 'Track not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Retrieve tracks metadata by artist name
async function getTracksByArtist(req, res) {

  const artistName = req.params.artistName;

  try {
    const tracks = await Track.findAll({
        include: [
          {
            model: Artist,
            where: {
              name: {
                [Sequelize.Op.like]: Sequelize.literal(`LOWER('%${artistName}%')`)
              }
            }
          }
        ]
      });

    if (tracks.length > 0) {
      res.status(200).json(tracks);
    } else {
      res.status(404).json({ error: 'No tracks found for the artist' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  createTrack,
  getTrackByISRC,
  getTracksByArtist,
};
