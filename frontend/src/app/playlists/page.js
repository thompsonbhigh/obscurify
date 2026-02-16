
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
    
    const data = await res.json();

    return (
        <main>
            <h1 className={styles.name}>
                obscurify
            </h1>
            <h2>Playlists</h2>
            <ul>
                {data.items?.map(p => (
                    <li key={p.id}>
                        <div>{p.name}</div>
                        <div>{p.items.total} tracks</div>
                    </li>
                ))}
            </ul>
        </main>
    );
}