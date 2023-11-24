import diacritics from "./diacritics";
import letters from "./letters";

const charOptions =
  "i0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const getRandomNumber = (cap) => Math.floor(Math.random() * cap);
const getRandomItem = (arr) => arr[getRandomNumber(arr.length)];
const getRandomChar = () => getRandomItem(charOptions);
function generateRandomId() {
  let id = "";
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 6; i++) {
    id += getRandomChar();
  }
  return id;
}

const anyDiacritic = new RegExp(`[${letters}]`, "g");
export default function generateId(title) {
  const titleId = title
    .toLowerCase()
    .slice(0, 30)
    .replace(anyDiacritic, (match) => diacritics[match])
    .replace(/ /g, "-")
    .replace(/[^a-z0-9-]/gi, "");
  return `${titleId}-${generateRandomId()}`;
}
