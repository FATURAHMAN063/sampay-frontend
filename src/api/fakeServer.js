// Fake Server - Mock data untuk testing
export const fakeServer = {
  // Server implementation here
};
// Simulasi database "lokal"
export const db = {
  users: [
    {
      id: 1,
      name: "User Demo",
      email: "demo@sampay.com",
      password: "123456",
    }
  ],
  banks: [
    {
      id: 1,
      name: "Bank Sampah Bersih Jaya",
      address: "Jakarta Selatan",
      status: "ready",
      prices: {
        plastik: 3000,
        botol: 2000,
        kertas: 1500,
      },
    },
    {
      id: 2,
      name: "Bank Sampah Hijau Makmur",
      address: "Jakarta Barat",
      status: "busy",
      prices: {
        plastik: 2500,
        botol: 1800,
        kertas: 1200,
      },
    },
  ],
  listings: []
};
