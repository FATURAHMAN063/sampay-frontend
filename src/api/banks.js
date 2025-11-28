import { db } from "./fakeServer";

export const getBanks = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(db.banks);
    }, 500); // delay biar mirip server beneran
  });
};


// Banks API - Untuk mengelola data bank
export const banksAPI = {
  // Banks API implementation here
};
