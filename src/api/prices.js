import { db } from "./fakeServer";

export const getRealTimePrices = () => {
  const base = db.banks[0].prices;

  const randomize = (v) => v + Math.floor(Math.random() * 200 - 100);

  return {
    plastik: randomize(base.plastik),
    botol: randomize(base.botol),
    kertas: randomize(base.kertas),
  };
};
