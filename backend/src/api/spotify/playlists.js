import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

router.get('/', async (req, res) => {
    const access_token = req.session.spotify.access_token;

    const response = await fetch(`https://api.spotify.com/v1/me/playlists`, {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    });

    const data = await response.json();
    res.json(data);
})