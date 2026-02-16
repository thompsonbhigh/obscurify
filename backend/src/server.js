import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import https from 'https';
import fs from 'fs';
import session from 'express-session';

import authRoutes from './routes/auth.js';
// import spotifyRoutes from './routes/spotify.js';

dotenv.config();

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_ORIGIN,
    credentials: true,
}));

app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());
app.use(session({
    secret: 'baines-secret',
    resave: false,
    saveUninitialized: true,
}));

app.get('/health', (req, res) => res.json({ ok: true }));

app.use('/auth', authRoutes);
// app.use('/', spotifyRoutes);

// TODO app.use engine

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'server error'});
});

https.createServer({
    key: fs.readFileSync("certs/localhost-key.pem"),
    cert: fs.readFileSync("certs/localhost.pem"),
    ca: fs.readFileSync("certs/rootCA.pem"),
},
app).listen(process.env.PORT, "0.0.0.0", () => console.log('API running on https://localhost:${process.env.PORT}'));