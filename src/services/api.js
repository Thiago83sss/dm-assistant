const BASE_URL = "https://www.dnd5eapi.co";

async function request(path) {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) throw new Error(`Error ${res.status} al consultar ${path}`);
  return res.json();
}

export const getMonsterList = () => request("/api/monsters");

export const getMonster = (index) => request(`/api/monsters/${index}`);

export const getMonstersByCR = (cr) => request(`/api/monsters?challenge_rating=${cr}`);

export const getEquipmentList = () => request("/api/equipment");
export const getEquipment = (index) => request(`/api/equipment/${index}`);

export const getMagicItemList = () => request("/api/magic-items");
export const getMagicItem = (index) => request(`/api/magic-items/${index}`);