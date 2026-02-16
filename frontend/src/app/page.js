'use client';

import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
    const login = () => {
        window.location.href = `https://127.0.0.1:4000/auth/login`;
    };

    return (
        <main className={styles.main}>
            <h1 className={styles.name}>
                obscurify
            </h1>
            <button onClick={login} className={styles.loginbtn}>
                Log in with <img src="spotify_logo.png"/>
                </button>
        </main>
    );
}
