const API_URL = `${import.meta.env.VITE_API_URL}`;

export async function searchAuthors(query) {
  if (!query) return [];

  const res = await fetch(
    `${API_URL}/search?q=${encodeURIComponent(query)}`,
    {
      credentials: "include",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to search authors");
  }

  return res.json();
}
export async function getAuthorById(authorId) {
  const res = await fetch(`${API_URL}/author/${authorId}`, {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch author");
  }

  return res.json();
}

export async function getAuthorPosts(authorId) {
  const res = await fetch(`${API_URL}/author/${authorId}/posts`, {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch author posts");
  }

  return res.json();
}

export async function toggleFollowAuthor(authorId) {
  const res = await fetch(`${API_URL}/author/${authorId}/follow`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to toggle follow");
  }

  return res.json();
}
