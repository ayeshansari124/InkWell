const API_URL = "http://localhost:4000";

export async function updateProfile({ bio, avatar }) {
  const data = new FormData();
  data.append("bio", bio);

  if (avatar) {
    data.append("avatar", avatar);
  }

  const res = await fetch(`${API_URL}/profile`, {
    method: "PUT",
    body: data,
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to update profile");
  }

  return res.json();
}
