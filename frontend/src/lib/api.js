const API_BASE = process.env.API_BASE;

export async function apiFetch(path, options = {}) {
    const res = await fetch(`${API_BASE}${path}`, {
        ...options,
        credentials: "include",
        headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
        },
    });

    if (res.status === 401) {
        throw new Error("unauthorized");
    }

    const text = await res.text();
    let data;
    try { data = JSON.parse(text); } catch { data = { raw: text }; }

    if (!res.ok) {
        const msg = data?.error || `http_${res.status}`;
        throw new Error(msg);
    }
    return data;
}
