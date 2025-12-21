const API_URL = `${process.env.VITE_API_URL}`;

export async function getAllPosts() {
  const res = await fetch(`${API_URL}/post`, {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
}


export async function getPostById(id) {
  const res = await fetch(`${API_URL}/post/${id}`, {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Post not found");
  }

  return res.json();
}

export async function createPost({ title, summary, content, file }) {
  const data = new FormData();
  data.append("title", title);
  data.append("summary", summary);
  data.append("content", content);
  data.append("file", file);

  const res = await fetch(`${API_URL}/post`, {
    method: "POST",
    body: data,
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to create post");
  }

  return res.json();
}

export async function updatePost(id, { title, summary, content, file }) {
  const data = new FormData();
  data.append("title", title);
  data.append("summary", summary);
  data.append("content", content);

  if (file) {
    data.append("file", file);
  }

  const res = await fetch(`${API_URL}/post/${id}`, {
    method: "PUT",
    body: data,
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to update post");
  }

  return res.json();
}

export async function deletePost(id) {
  const res = await fetch(`${API_URL}/post/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to delete post");
  }

  return res.json();
}
