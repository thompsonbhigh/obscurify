import express from 'express';
import dotenv from 'dotenv';
import db from '../db.js';

dotenv.config();
const router = express.Router();

router.get('/playlists', async (req, res) => {
    const { rows } = await db.query('SELECT access_token FROM users WHERE id = 1');
    const access_token = rows.at(0).access_token;
    
    const response = await fetch(`https://api.spotify.com/v1/me/playlists`, {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    });

    const data = await response.json();
    console.log(data);
    res.json(data);
});

export default router;