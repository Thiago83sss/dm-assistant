export const randInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const parseCR = (cr) => {
  if (typeof cr === "number") return cr;
  if (String(cr).includes("/")) {
    const [a, b] = cr.split("/");
    return Number(a) / Number(b);
  }
  return Number(cr);
};

export function generateCoins(cr) {
  const level = parseCR(cr);
  const coins = { cp: 0, sp: 0, gp: 0, pp: 0 };

  if (level < 1) {
    coins.cp = randInt(5, 50);
    coins.sp = randInt(0, 20);
  } else if (level <= 4) {
    coins.cp = randInt(20, 100);
    coins.sp = randInt(10, 60);
    coins.gp = randInt(5, 40);
  } else if (level <= 10) {
    coins.sp = randInt(50, 200);
    coins.gp = randInt(50, 250);
    coins.pp = randInt(0, 20);
  } else if (level <= 16) {
    coins.gp = randInt(300, 1200);
    coins.pp = randInt(20, 100);
  } else {
    coins.gp = randInt(1500, 6000);
    coins.pp = randInt(100, 500);
  }
  return coins;
}


export function lootRules(cr) {
  const level = parseCR(cr);
  if (level < 1) return { items: randInt(0, 1), magicChance: 0 };
  if (level <= 4) return { items: randInt(1, 2), magicChance: 0.1 };
  if (level <= 10) return { items: randInt(1, 3), magicChance: 0.35 };
  if (level <= 16) return { items: randInt(2, 4), magicChance: 0.6 };
  return { items: randInt(3, 5), magicChance: 0.85 };
}

export const pickRandom = (arr) => arr[randInt(0, arr.length - 1)];