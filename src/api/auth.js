import { db } from "./fakeServer";
// Authentication API - Untuk mengelola autentikasi
export const authAPI = {
  // Auth API implementation here
};
export const login = (email, password) => {
  const user = db.users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return { success: false, message: "Email atau password salah" };
  }

  localStorage.setItem("sampay-user", JSON.stringify(user));
  return { success: true, user };
};

export const register = (name, email, password) => {
  const exists = db.users.find((u) => u.email === email);

  if (exists) {
    return { success: false, message: "Email sudah terdaftar" };
  }

  const newUser = {
    id: db.users.length + 1,
    name,
    email,
    password,
  };

  db.users.push(newUser);
  localStorage.setItem("sampay-user", JSON.stringify(newUser));

  return { success: true, user: newUser };
};



