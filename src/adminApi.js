
const API_BASE = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
).replace(/\/+$/, "");

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    credentials: "include",
    ...options,
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...options.headers,
    },
  });

  const contentType = response.headers.get("content-type") || "";
  const data = contentType.includes("application/json")
    ? await response.json()
    : {};

  if (response.status === 401) {
    const error = new Error(data.message || "Please sign in again.");
    error.status = 401;
    throw error;
  }

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong.");
  }

  return data;
}

export const adminApi = {
  login: (email, password) =>
    request("/api/admin/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  logout: () =>
    request("/api/admin/logout", { method: "POST" }),

  getSession: () => request("/api/admin/session"),

  getMessages: ({ page = 1, limit = 20, search = "", filter = "all" } = {}) => {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
      search,
      filter,
    });

    return request(`/api/admin/messages?${params}`);
  },

  getMessage: (id) =>
    request(`/api/admin/messages/${encodeURIComponent(id)}`),

  markRead: (id) =>
    request(`/api/admin/messages/${encodeURIComponent(id)}/read`, {
      method: "PATCH",
    }),

  reply: (id, { subject, message }) =>
    request(`/api/admin/messages/${encodeURIComponent(id)}/reply`, {
      method: "POST",
      body: JSON.stringify({ subject, message }),
    }),
};
