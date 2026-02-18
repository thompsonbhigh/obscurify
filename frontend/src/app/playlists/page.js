
import styles from "../page.module.css";

export default async function Playlists() {
    const res = await fetch(`https://127.0.0.1:4000/playlists`, {
        cache: 'no-store',
        credentials: 'include',
    });

    console.log(res);

    if (!res.ok) {
        return <div>Not logged in or failed to load playlists</div>
    }

    const viewPlaylist = (id) => {
        window.location.href = `https://127.0.0.1:4000/viewPlaylist`;
    }
    
    const data = await res.json();

    return (
        <main>
            <h1 className={styles.name}>
                obscurify
            </h1>
            <h2 className={styles.name}>Playlists</h2>
            <div className={styles.playlists}>
                {data.items?.map(p => (
                    <div className={styles.playlistItem} key={p.id}>
                        <img onClick={viewPlaylist} src={p.images[0].url}/>
                    </div>
                ))}
            </div>
        </main>
    );
}