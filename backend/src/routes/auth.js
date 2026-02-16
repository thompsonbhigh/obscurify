import express from 'express';
import dotenv from 'dotenv';
import crypto from 'crypto';
import querystring from 'node:querystring';
import { ref } from 'node:process';

dotenv.config();
const router = express.Router();

const client_id = process.env.SPOTIFY_CLIENT_ID;
const redirect_uri = process.env.SPOTIFY_REDIRECT_URI

router.get('/login', (req, res) => {
    const state = crypto.randomBytes(16).toString('hex');
    const scope = 'user-read-private user-read-email playlist-read-private';

    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state
        }));
});

router.get('/callback', async (req, res) => {
    
    const code = req.query.code || null;
    const state = req.query.state || null;

    if (state === null) {
        res.redirect('/#' +
            querystring.stringify({
                error: 'state_mismatch'
            }));
    } else {
        // const authOptions = {
        //     url: 'https://accounts.spotify.com/api/token',
        //     form: {
        //         code: code,
        //         redirect_uri: redirect_uri,
        //         grant_type: 'authorization_code'
        //     },
        //     headers: {
        //         'content-type': 'application/x-www-form-urlencoded',
        //         'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64'))
        //     },
        //     json: true
        // };
        const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64')),
            },
            body: new URLSearchParams({
                code: code,
                redirect_uri: redirect_uri,
                grant_type: 'authorization_code',
            }),
        });

        const tokenJson = await tokenRes.json();

        const { access_token, refresh_token, expires_in } = tokenJson;
        req.session.spotify = { access_token, refresh_token, expires_at: Date.now() + expires_in * 1000 };
    }
    res.redirect(`${process.env.FRONTEND_ORIGIN}/playlists`);
});

export default router;