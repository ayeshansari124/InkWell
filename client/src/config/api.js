export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:4000";

export const fetchWithCredentials = (url, options = {}) =>
  fetch(`${API_BASE_URL}${url}`, {
    credentials: "include",
    ...options,
  }).then((res) => {
    if (!res.ok) throw new Error("API Error");
    return res.json();
  });
